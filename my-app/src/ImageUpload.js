import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Проверяем тип файла
      const fileType = file.type;
      if (
        fileType !== "image/jpeg" &&
        fileType !== "image/png" &&
        fileType !== "image/jpg"
      ) {
        setErrorMessage("Допустимые форматы: JPG и PNG.");
        setSelectedFile(null); // Сбрасываем выбранный файл
      } else {
        setErrorMessage("");
        setSelectedFile(file);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Пожалуйста, выберите файл!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResult(data); // Сохраняем результат от сервера
      } else {
        const errorResult = await response.json();
        alert(`Ошибка: ${errorResult.message || "Неизвестная ошибка"}`);
      }
    } catch (error) {
      alert(`Ошибка подключения: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading upload-page2">
        <div className="spinner"></div>Загрузка...
      </div>
    );
  }

  if (result) {
    return (
      <div className="upload-page2">
        <div className="result-page">
          <h2>Результат</h2>
          <p className="prediction">
            <strong>Тип змеи:</strong> {result.prediction}
          </p>
          <p className="confidence">
            <strong>Точность предсказания:</strong> {result.confidence}
          </p>
          <div className="image-gallery">
            <div className="image-card">
              <img
                src={`${process.env.REACT_APP_BASE_URL}/api${result.userImage}`}
                alt="Загруженная змея"
              />
              <div className="card-info">
                <h3>Фото загруженной змеи</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>Загрузите фото змеи</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <button type="submit">Распознать</button>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
