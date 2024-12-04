import React, { useState } from 'react';
import './UploadPhoto.css';

const UploadPhoto = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      alert('Пожалуйста, выберите файл!');
      return;
    }
    
    setUploading(true);
    setError(null);

    
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке файла');
      }

      alert('Фото загружено успешно!');
    } catch (err) {

      setError(err.message);
      alert('Ошибка загрузки');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-page">
        <div className="upload-container">
        <h1>Загрузите своё фото</h1>
        <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileChange} />
            <button type="submit" disabled={uploading}>Загрузить</button>
        </form>
        {uploading && <p>Загрузка...</p>}
        {error && <p className="error">{error}</p>}
        </div>
    </div>
  );
};

export default UploadPhoto;
