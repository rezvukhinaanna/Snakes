import React from 'react';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Распознаватель змей</h1>
        <p>Используйте передовые технологии для идентификации видов змей с помощью распознавания изображений.</p>
        <div className="buttons">
          <button className="btn-primary">Загрузить фото</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
