import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [snakeType, setSnakeType] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setSnakeType('');
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('YOUR_API_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSnakeType(response.data.snakeType);
    } catch (err) {
      setError('Ошибка при распознавании изображения');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Загрузите фото змеи</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? 'Идет загрузка...' : 'Отправить'}
        </button>
      </form>
      {snakeType && <h2>Тип змеи: {snakeType}</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
