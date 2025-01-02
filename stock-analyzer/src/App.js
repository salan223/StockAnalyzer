import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import BackendTest from './components/BackendTest';


const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <BackendTest />
      <Footer />
    </div>
  );
};

export default App;
