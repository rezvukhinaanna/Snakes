import React from 'react';
import './SnakeGallery.css';

// Компонент для отображения отдельной карточки змеи
const SnakeCard = ({ name, image }) => {
  return (
    <div className="snake-card-custom">
      <img src={image} alt={name} className="snake-image-custom" />
      <p className="snake-name-custom">{name}</p>
    </div>
  );
};

// Основной компонент для галереи
const SnakeGallery = () => {
  const snakeCategories = [
    {
      category: 'Ужи',
      snakes: [
        { name: 'Обыкновенный уж', image: '/image/obyknovenny_uzh.jpg' },
        { name: 'Европейский уж', image: '/image/evropeyskiy_uzh.jpg' },
        { name: 'Уж черный', image: '/image/uzh_chernyj.jpg' },
        { name: 'Гартеровая змея', image: '/image/garter_snake.jpg' },
        { name: 'Уж полосатый', image: '/image/uzh_polosatyj.jpg' }
      ]
    },
    {
      category: 'Медянки',
      snakes: [
        { name: 'Медянка обыкновенная', image: '/image/medyanka_obyknovennaya.jpg' },
        { name: 'Медянка черная', image: '/image/medyanka_chernaya.jpg' },
        { name: 'Медянка борнео', image: '/image/medyanka_borneo.jpg' },
        { name: 'Медянка тайская', image: '/image/medyanka_tajskaya.jpg' },
        { name: 'Медянка серая', image: '/image/medyanka_seraya.jpg' }
      ]
    },
    {
      category: 'Гадюки',
      snakes: [
        { name: 'Гадюка обыкновенная', image: '/image/gadyuka_obyknovennaya.jpg' },
        { name: 'Гадюка Кавказская', image: '/image/gadyuka_kavkazskaya.jpg' },
        { name: 'Гадюка степная', image: '/image/gadyuka_stepnaya.jpg' },
        { name: 'Гадюка Камчатская', image: '/image/gadyuka_kamchatskaya.jpg' },
        { name: 'Гадюка черная', image: '/image/gadyuka_chernaya.jpg' }
      ]
    }
  ];

  return (
    <div className="snake-gallery-container-custom">
      {snakeCategories.map((category, index) => (
        <div key={index} className="snake-category-custom">
          <h2 className="category-title-custom">{category.category}</h2>
          <div className="snake-gallery-custom">
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
