import React from 'react';
import './App.css';
import Header from './Header';
import MainSection from './MainSection';
import FeaturesSection from './FeaturesSection';
import ImageUpload from './ImageUpload';
import UploadPhoto from './UploadPhoto';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <MainSection />
              <FeaturesSection />
            </>
          } />

          <Route path="/imageupload" element={<ImageUpload />} />
     
          <Route path="/uploadphoto" element={<UploadPhoto />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
