import React, { useState } from 'react';
import './HeroSection.css';
import axios from 'axios';

const HeroSection = () => {
  const [searchInput, setSearchInput] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');
  const [ticker, setTicker] = useState(''); // To pass the ticker for TradingView

  const handleSearch = async () => {
    if (!searchInput) {
      setError('Please enter a stock ticker.');
      return;
    }

    try {
      setError('');
      const response = await axios.get(`http://127.0.0.1:5000/api/stock?ticker=${searchInput}`);
      setStockData(response.data);
      setTicker(searchInput.toUpperCase()); // Save the ticker to use in TradingView
    } catch (err) {
      setError('Failed to fetch stock data.');
      console.error(err);
    }
  };

  return (
    <div className="hero-section">
      <h1 className="hero-title">Make Smarter, Data-Driven Investment Decisions</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search any Stock or Expert for a free analysis"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {stockData && (
        <div className="stock-details-container">
        <div className="stock-details">
          <h2>{stockData.ticker}</h2>
          <table>
            <tbody>
              <tr>
                <td>Market Cap</td>
                <td>{stockData.market_cap}</td>
              </tr>
              <tr>
                <td>Revenue</td>
                <td>{stockData.revenue}</td>
              </tr>
              <tr>
                <td>Dividend</td>
                <td>{stockData.dividend}</td>
              </tr>
              <tr>
                <td>Open</td>
                <td>{stockData.open_price}</td>
              </tr>
              <tr>
                <td>Previous Close</td>
                <td>{stockData.previous_close}</td>
              </tr>
              <tr>
                <td>Valuation</td>
                <td>{stockData.valuation}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tradingview-chart">
          <iframe
            src={`https://s.tradingview.com/embed-widget/advanced-chart/?symbol=${ticker}`}
            width="100%"
            height="500px"
            frameBorder="0"
            allowTransparency="true"
            scrolling="no"
            style={{ border: 'none' }}
            title={`TradingView chart for ${ticker}`}
          ></iframe>
        </div>
      </div>
      
      )}
    </div>
  );
};

export default HeroSection;
