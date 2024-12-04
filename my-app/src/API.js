const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 5000;

// Настройка multer для загрузки файлов
const upload = multer({
  dest: 'uploads/', // Папка для хранения файлов
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Только изображения!'), false);
    }
  },
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Ошибка загрузки файла');
  }
  res.send('Файл успешно загружен');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
