import React from 'react';
import './FeaturesSection.css';

function FeaturesSection() {
  const features = [
    { title: "Обученная модель", description: "Используется модель, обученная на актуальных данных." },
    { title: "Высокая точность", description: "Наша модель обеспечивает проверенную высокую точность." },
    { title: "Быстрая интеграция", description: "Легко интегрируется и масштабируется в любых проектах." },
  ];

  return (
    <section className="features" id="features">
      {/* <h2>Почему стоит выбрать нас?</h2> */}
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="icon-placeholder"></div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturesSection;
