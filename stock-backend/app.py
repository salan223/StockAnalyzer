import yfinance as yf
from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

@app.route('/api/stock', methods=['GET'])
def get_stock_data():
    ticker = request.args.get('ticker', '')
    if not ticker:
        return jsonify({'error': 'No ticker symbol provided'}), 400

    try:
        # Fetch stock data
        stock = yf.Ticker(ticker)
        history = stock.history(period="1y")  # Fetch 1 year of price history

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
        print(e)
        return jsonify({'error': 'Failed to fetch stock data'}), 500

if __name__ == '__main__':
    app.run(debug=True)
