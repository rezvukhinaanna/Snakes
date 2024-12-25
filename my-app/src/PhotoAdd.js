import React, { useState } from "react";
import "./PhotoAdd.css";

const PhotoAdd = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type !== "image/jpeg") {
      alert("Пожалуйста, загрузите файл формата JPG!");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile || !title || !description) {
      alert("Заполните все поля и выберите файл!");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", title);
    formData.append("description", description);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Ошибка при загрузке файла");
      }

      const result = await response.json();
      alert(`Файл успешно загружен!`);
    } catch (err) {
      setError(err.message);
      alert("Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="photo-add-page">
      <div className="photo-add-container">
        <h1>Загрузите изображение</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Описание"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <input type="file" accept=".jpg" onChange={handleFileChange} />
          <button type="submit" disabled={uploading}>
            Загрузить
          </button>
        </form>
        {uploading && <p className="photo-add-status">Загрузка...</p>}
        {error && <p className="photo-add-error">{error}</p>}
      </div>
    </div>
  );
};

export default PhotoAdd;
