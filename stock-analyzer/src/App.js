import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import StockSearch from './components/StockSearch';

const App = () => {
  const searchSectionRef = useRef(null);

  const scrollToSearch = () => {
    searchSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />
      <HeroSection scrollToSearch={scrollToSearch} />
      <div ref={searchSectionRef}>
        <StockSearch />
      </div>
      <Footer />
    </div>
  );
};

export default App;
