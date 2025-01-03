import React, { useState } from 'react';
import './StockSearch.css';
import axios from 'axios';

const StockSearch = () => {
  // State for search input, stock data, news, and error handling
  const [searchInput, setSearchInput] = useState('');
  const [stockData, setStockData] = useState(null);
  const [news, setNews] = useState([]);
  const [error, setError] = useState('');

  // Function to handle the stock search
  const handleSearch = async () => {
    if (!searchInput) {
      setError('Please enter a stock ticker.');
      return;
    }

    try {
      setError('');
      const stockResponse = await axios.get(`http://127.0.0.1:5000/api/stock?ticker=${searchInput}`);
      setStockData(stockResponse.data);

      const newsResponse = await axios.get(`http://127.0.0.1:5000/api/stock-news?ticker=${searchInput}`);
      setNews(newsResponse.data.articles || []);
    } catch (err) {
      setError('Failed to fetch stock data or news.');
      console.error(err);
    }
  };

  return (
    <div className="stock-search">
      <h2 className="stock-title">Search for Stock Analysis</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter stock ticker"
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
          {/* About Section */}
          <div className="about-section">
            <h2>About {stockData.company_name}</h2>
            <p>{stockData.description}</p>
          </div>

          {/* Stock Details and Chart */}
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

          {/* News Section */}
          <div className="news-section">
            <h2>Latest News for {stockData.ticker}</h2>
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
          </div>
        </>
      )}
    </div>
  );
};

export default StockSearch;
