import React, { useState } from "react";
import "./ImageUpload.css";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setStatusMessage("Пожалуйста, выберите файл!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setStatusMessage(
          `Фото успешно загружено! Сервер ответил: ${result.message}`
        );
      } else {
        setStatusMessage("Ошибка при загрузке файла.");
      }
    } catch (error) {
      setStatusMessage(`Ошибка подключения: ${error.message}`);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <h1>Загрузите фото змеи</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Распознать</button>
        </form>
        {statusMessage && <p className="upload-status">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default ImageUpload;
