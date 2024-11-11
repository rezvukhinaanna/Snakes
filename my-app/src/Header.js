import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">Распознаватель змей</div>
      <nav>
        <ul>
          <li><button className="btn-secondary"><a href="#features">Сведения</a></button></li>
          <li><button className="btn-secondary"><a href="#contact">Контакты</a></button></li>
          <li><button className="btn-primary">Начать</button></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
