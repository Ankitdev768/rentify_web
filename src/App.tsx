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
import ContactPage from './components/ContactPage';

// 👇 Import the partner forms
import MessOwnerWeb from './pages/Mess/MessOwnerWeb';
import RoomOwnerWeb from './pages/Room/RoomOwnerWeb';
import MessOwnerForm from './pages/Mess/MessOwnerForm';
import RoomOwnerForm from './pages/Room/RoomOwnerForm';

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
        <Route path="/mess-owner" element={<MessOwnerWeb />} />
        <Route path="/room-owner" element={<RoomOwnerWeb />} />
        <Route path="/mess-owner-form" element={<MessOwnerForm />} />
        <Route path="/room-owner-form" element={<RoomOwnerForm />} />
        <Route path="/contact-page" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
