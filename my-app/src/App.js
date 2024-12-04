import React from 'react';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import FeaturesSection from './FeaturesSection';
import ImageUpload from './ImageUpload';
import UploadPhoto from './UploadPhoto';
import SnakeGallery from './SnakeGallery';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<><MainSection /><FeaturesSection /></>} />
          <Route path="/imageupload" element={<ImageUpload />} />
          <Route path="/uploadphoto" element={<UploadPhoto />} />
          <Route path="/snake-gallery" element={<SnakeGallery />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
