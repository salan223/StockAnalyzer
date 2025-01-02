import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import requests
import os
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Use environment variable for API key
NEWS_API_KEY = os.getenv('NEWS_API_KEY', '656a207c314d4439b45406ddadbb161a')  # Replace with your NewsAPI key

# Configure logging
logging.basicConfig(level=logging.ERROR)

@app.route('/api/stock-news', methods=['GET'])
def get_stock_news():
    ticker = request.args.get('ticker', '')
    if not ticker:
        return jsonify({'error': 'No ticker symbol provided'}), 400

    try:
        # Fetch news for the stock ticker
        news_url = f'https://newsapi.org/v2/everything?q={ticker}&apiKey={NEWS_API_KEY}'
        response = requests.get(news_url)
        if response.status_code == 403:
            return jsonify({'error': 'Invalid API key or rate limit exceeded'}), 403
        elif response.status_code != 200:
            return jsonify({'error': 'Failed to fetch news data'}), response.status_code
        
        news_data = response.json()
        articles = news_data.get('articles', [])
        return jsonify({'articles': articles[:5]})  # Return top 5 articles

    except Exception as e:
        logging.error(f"Error fetching news: {e}")
        return jsonify({'error': 'Failed to fetch news'}), 500


@app.route('/api/stock', methods=['GET'])
def get_stock_data():
    ticker = request.args.get('ticker', '')
    if not ticker:
        return jsonify({'error': 'No ticker symbol provided'}), 400

    try:
        # Fetch stock data
        stock = yf.Ticker(ticker)
        history = stock.history(period="1y")  # Fetch 1 year of price history

        if history.empty:
            return jsonify({'error': f'No data found for ticker {ticker}'}), 404

        # Calculate basic metrics
        current_price = history['Close'][-1]
        previous_close = history['Close'][-2]
        price_change = current_price - previous_close
        percent_change = (price_change / previous_close) * 100

        market_cap = stock.info.get('marketCap', 'N/A')
        revenue = stock.info.get('totalRevenue', 'N/A')
        dividend = stock.info.get('dividendRate', 'N/A')
        open_price = stock.info.get('open', 'N/A')
        is_undervalued = "Undervalued" if stock.info.get('forwardPE', 0) < 15 else "Overvalued"

        # Prepare data for frontend
        stock_data = {
            'ticker': ticker.upper(),
            'current_price': round(current_price, 2),
            'previous_close': round(previous_close, 2),
            'price_change': round(price_change, 2),
            'percent_change': round(percent_change, 2),
            'market_cap': market_cap,
            'revenue': revenue,
            'dividend': dividend,
            'open_price': open_price,
            'valuation': is_undervalued,
            'price_history': history['Close'].tolist(),
            'dates': history.index.strftime('%Y-%m-%d').tolist()
        }
        return jsonify(stock_data)

    except Exception as e:
        logging.error(f"Error fetching stock data: {e}")
        return jsonify({'error': 'Failed to fetch stock data'}), 500

if __name__ == '__main__':
    app.run(debug=True)
