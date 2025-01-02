import React, { useState } from 'react';
import './HeroSection.css';
import axios from 'axios';

const HeroSection = () => {
  const [searchInput, setSearchInput] = useState('');
  const [stockData, setStockData] = useState(null);
  const [news, setNews] = useState([]); // State for news articles
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchInput) {
      setError('Please enter a stock ticker.');
      return;
    }

    try {
      setError('');
      // Fetch stock data
      const stockResponse = await axios.get(`http://127.0.0.1:5000/api/stock?ticker=${searchInput}`);
      setStockData(stockResponse.data);

      // Fetch stock news
      const newsResponse = await axios.get(`http://127.0.0.1:5000/api/stock-news?ticker=${searchInput}`);
      setNews(newsResponse.data.articles || []);
    } catch (err) {
      setError('Failed to fetch stock data or news.');
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
        <>
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
                src={`https://s.tradingview.com/embed-widget/advanced-chart/?symbol=${stockData.ticker}`}
                width="100%"
                height="500px"
                frameBorder="0"
                allowTransparency="true"
                scrolling="no"
                style={{ border: 'none' }}
                title={`TradingView chart for ${stockData.ticker}`}
              ></iframe>
            </div>
          </div>
          <div className="news-section">
            <h2>Latest News for {stockData.ticker}</h2>
            {news.length === 0 ? (
              <p>No news available for this stock.</p>
            ) : (
              <ul>
                {news.map((article, index) => (
                  <li key={index} className="news-article">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      <h3>{article.title}</h3>
                    </a>
                    <p>{article.description}</p>
                    <small>Source: {article.source.name}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroSection;
