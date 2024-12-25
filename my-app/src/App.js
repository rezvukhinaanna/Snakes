import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import FeaturesSection from './FeaturesSection';
import ImageUpload from './ImageUpload';
import PhotoAdd from './PhotoAdd';
import SnakeGallery from './SnakeGallery';

function App() {
  const location = useLocation();

  // Условие отображения Header
  const hideHeaderRoutes = ['/imageupload', '/uploadphoto'];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <div className="app">
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path="/" element={<><MainSection /><FeaturesSection /></>} />
        <Route path="/imageupload" element={<ImageUpload />} />
        <Route path="/uploadphoto" element={<PhotoAdd />} />
        <Route path="/snake-gallery" element={<SnakeGallery />} />
      </Routes>
    </div>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
