import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Hero from './components/Hero';
import PopularCities from './components/PopularCities';
import Categories from './components/Categories';
import Features from './components/Features';
import Function from './components/function';
import Join from './components/join';
import DownloadApp from './components/DownloadApp';
import Footer from './components/Footer';

// 👇 Import the partner forms
import MessOwnerForm from './pages/MessOwnerForm';
import RoomOwnerForm from './pages/RoomOwnerForm';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main landing page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <PopularCities />
              <Categories />
              <Features />
              <Function />
              <Join />
              <DownloadApp />
              <Footer />
            </>
          }
        />

        {/* Routes for partner forms */}
        <Route path="/mess-owner" element={<MessOwnerForm />} />
        <Route path="/room-owner" element={<RoomOwnerForm />} />
      </Routes>
    </Router>
  );
}

export default App;
