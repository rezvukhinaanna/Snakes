import React, { useState } from 'react';
import './UploadPhoto.css';

const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // обработка изображения
    alert('Фото загружено!');
  };

  return (
    <div className="upload-page">
        <div className="upload-container">
        <h1>Загрузите своё фото</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit">Загрузить</button>
        </form>
        </div>
    </div>
  );
};

export default UploadPhoto;
