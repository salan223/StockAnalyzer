import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS
import openai
import logging
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])  # Allow React app to access the backend

# API Keys
openai.api_key = os.getenv('OPENAI_API_KEY', 'your-openai-api-key')  # Replace with your OpenAI API key

# Configure logging
logging.basicConfig(level=logging.DEBUG)  # Log all messages for debugging purposes

@app.route('/api/stock-news', methods=['GET'])
def get_stock_news():
    ticker = request.args.get('ticker', '')
    if not ticker:
        return jsonify({'error': 'No ticker symbol provided'}), 400

    try:
        news_url = f'https://newsapi.org/v2/everything?q={ticker}&apiKey=your-news-api-key'  # Replace with your NewsAPI key
        response = requests.get(news_url)
        if response.status_code != 200:
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
        stock = yf.Ticker(ticker)
        history = stock.history(period="1y")

        if history.empty:
            return jsonify({'error': f'No data found for ticker {ticker}'}), 404

        stock_info = stock.info
        current_price = history['Close'][-1]
        previous_close = history['Close'][-2]
        price_change = current_price - previous_close
        percent_change = (price_change / previous_close) * 100

        stock_data = {
            'ticker': ticker.upper(),
            'current_price': round(current_price, 2),
            'price_change': round(price_change, 2),
            'percent_change': round(percent_change, 2),
        }
        return jsonify(stock_data)

    except Exception as e:
        logging.error(f"Error fetching stock data: {e}")
        return jsonify({'error': 'Failed to fetch stock data'}), 500

# New chatbot route
@app.route('/api/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    user_message = data.get('message', '')

    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=f"Answer this stock-related question: {user_message}",
            max_tokens=150,
            temperature=0.7
        )
        chatbot_reply = response.choices[0].text.strip()
        return jsonify({'response': chatbot_reply})

    except Exception as e:
        logging.error(f"Error in chatbot: {e}")
        return jsonify({'error': 'Failed to generate chatbot response'}), 500


if __name__ == '__main__':
    app.run(debug=True)  # Start the Flask application
