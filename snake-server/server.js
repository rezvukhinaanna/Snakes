const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const cors = require("cors");

const app = express();
const upload = multer({ dest: "uploads/" });
app.use(cors());

// Папка для изображений, которые будут загружены пользователями
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Файл обязателен!" });
    }

    const imgPath = path.resolve(__dirname, "uploads", req.file.filename);
    const pythonScriptPath = path.resolve(__dirname, "../.venv/Snakes-analytics/snake_predict.py");

    const python = spawn(path.resolve(__dirname, "../.venv/Scripts/python.exe"), [pythonScriptPath, imgPath]);

    let output = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error("Ошибка Python:", data.toString());
    });

    python.on("close", (code) => {
      if (code === 0) {
        const prediction = output.trim().split("\n").pop();
        const [snakeType, confidence] = prediction.split("(уверенность:");

        // Сохраняем данные изображения в JSON файл
        const imageData = {
          title: req.body.title || "Без названия",
          description: req.body.description || "Описание не указано",
          file: req.file.filename,
          prediction: snakeType.trim(),
          confidence: confidence?.replace(")", "").trim(),
          userImage: `/uploads/${req.file.filename}`,
        };

        const jsonFilePath = path.resolve(__dirname, "uploads", "images.json");

        // Читаем существующий JSON файл, если он есть
        fs.readFile(jsonFilePath, "utf-8", (err, data) => {
          let images = [];

          if (!err && data) {
            images = JSON.parse(data);
          }

          images.push(imageData);

          // Записываем обновленный список изображений в JSON файл
          fs.writeFile(jsonFilePath, JSON.stringify(images, null, 2), (err) => {
            if (err) {
              console.error("Ошибка записи в JSON файл:", err);
              return res.status(500).json({ message: "Не удалось сохранить данные" });
            }

            // Отправляем результат
            res.status(200).json({
              prediction: snakeType.trim(),
              confidence: confidence?.replace(")", "").trim(),
              userImage: `/uploads/${req.file.filename}`, // Путь к загруженному изображению
            });
          });
        });
      } else {
        console.error(`Процесс завершился с кодом: ${code}`);
        res.status(500).json({ message: "Ошибка при обработке изображения" });
      }
    });
  } catch (error) {
    console.error("Ошибка обработки загрузки:", error);
    res.status(500).json({ message: "Произошла ошибка на сервере" });
  }
});

// Запуск сервера на порту 5000
const HOST = process.env.HOST || 'localhost'
const PORT = 5000;
app.listen(PORT, HOST, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
