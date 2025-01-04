import React, { useRef } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import StockSearch from './components/StockSearch';
import Chatbot from './components/chatbot'; // Import the Chatbot component

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
      {/* Add the Chatbot component here */}
      <div style={{ marginTop: '50px', padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ textAlign: 'center' }}>Chat with Our Stock Bot</h2>
        <Chatbot />
      </div>
      <Footer />
    </div>
  );
};

export default App;
