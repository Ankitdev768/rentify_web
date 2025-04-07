import React from 'react';
import Hero from './components/Hero';
import PopularCities from './components/PopularCities';
import Categories from './components/Categories';
import Features from './components/Features';
import DownloadApp from './components/DownloadApp';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <PopularCities />
      <Categories />
      <Features />
      <DownloadApp />
      <Footer />
    </div>
  );
}

export default App;