import React, { useState } from 'react';
import './HeroSection.css';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const HeroSection = () => {
  const [searchInput, setSearchInput] = useState('');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchInput) {
      setError('Please enter a stock ticker.');
      return;
    }

    try {
      setError('');
      const response = await axios.get(`http://127.0.0.1:5000/api/stock?ticker=${searchInput}`);
      setStockData(response.data);
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
          <div className="stock-chart">
            <Line
              data={{
                labels: stockData.dates,
                datasets: [
                  {
                    label: 'Price History',
                    data: stockData.price_history,
                    borderColor: 'rgba(250, 204, 21, 0.8)',
                    backgroundColor: 'rgba(250, 204, 21, 0.2)',
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;
