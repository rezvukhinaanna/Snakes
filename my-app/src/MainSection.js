import React from 'react';
import './MainSection.css';

function MainSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Распознаватель змей</h1>
        <p>Используйте передовые технологии для идентификации видов змей с помощью распознавания изображений.</p>
        <div className="buttons">
          <button className="btn-primary" onClick={() => window.location.href = '/imageupload'}>
            Распознать по фото
          </button>
          <button className="btn-primary" onClick={() => window.location.href = '/uploadphoto'}>
            Добавить свое фото в датасет
          </button>
        </div>
      </div>
    </section>
  );
}

export default MainSection;
