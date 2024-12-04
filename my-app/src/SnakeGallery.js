import React from 'react';
import './SnakeGallery.css';

// Компонент для отображения отдельной карточки змеи
const SnakeCard = ({ name, image }) => {
  return (
    <div className="snake-card">
      <img src={image} alt={name} className="snake-image" />
      <p className="snake-name">{name}</p>
    </div>
  );
};

// Основной компонент для галереи
const SnakeGallery = () => {
  const snakeCategories = [
    {
      category: 'Кобры',
      snakes: [
        { name: 'Кобра индийская', image: '/image/kobra_indijska.jpg' },
        { name: 'Кобра черная', image: '/image/kobra_chernaya.jpg' },
        { name: 'Королевская кобра', image: '/image/korolevskaya_kobra.jpg' },
        { name: 'Кобра Египетская', image: '/image/kobra_egipt.jpg' },
        { name: 'Сиамская кобра', image: '/image/siamskaya_kobra.jpg' }
      ]
    },
    {
      category: 'Питоны',
      snakes: [
        { name: 'Питон ретикулatus', image: '/image/piton_reticulatus.jpg' },
        { name: 'Питон королевский', image: '/image/piton_korolevsky.jpg' },
        { name: 'Питон сетчатый', image: '/image/piton_setchatyj.jpg' },
        { name: 'Питон Борнео', image: '/image/piton_borneo.jpg' },
        { name: 'Питон Тиморский', image: '/image/piton_timorskij.jpg' }
      ]
    },
    {
      category: 'Гадюки',
      snakes: [
        { name: 'Гадюка обыкновенная', image: '/images/gadyuka_obyknovennaya.jpg' },
        { name: 'Гадюка Кавказская', image: '/images/gadyuka_kavkazskaya.jpg' },
        { name: 'Гадюка степная', image: '/images/gadyuka_stepnaya.jpg' },
        { name: 'Гадюка Камчатская', image: '/images/gadyuka_kamchatskaya.jpg' },
        { name: 'Гадюка черная', image: '/images/gadyuka_chernaya.jpg' }
      ]
    }
  ];

  return (
    <div className="snake-gallery-container">
      {snakeCategories.map((category, index) => (
        <div key={index} className="snake-category">
          <h2 className="category-title">{category.category}</h2>
          <div className="snake-gallery">
            {category.snakes.map((snake, index) => (
              <SnakeCard key={index} name={snake.name} image={snake.image} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnakeGallery;
