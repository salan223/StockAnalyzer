# Stock Analyzer Website

## Overview
The **Stock Analyzer Website** is a comprehensive platform for investors and traders to analyze stock market performance. It is designed to facilitate market research, evaluate stock performance, and provide predictive insights using historical data. The application also offers real-time news to keep users informed about relevant market trends.

## Features
- **Stock Search**: Allows users to search for stock ticker symbols.
- **Performance Evaluation**: Determines if a stock is undervalued or overvalued.
- **Historical Data Analysis**: Predicts trends based on past performance.
- **Real-Time News**: Displays relevant market news.
- **Interactive Visualizations**: Utilizes charts to present key metrics such as market cap, revenue, and price history.
- **User-Friendly Design**: Includes a visually appealing landing page, intuitive navigation bar, and dynamic interactivity.

## Technology Stack
### Frontend
- **React**: Used for building the user interface.
- **React-ChartJS-2**: For interactive data visualization.
- **TailwindCSS**: Ensures modern and responsive styling.

### Backend
- **Flask**: Manages the server-side logic and APIs.
- **yFinance**: Fetches real-time stock data.

### Communication
- **Axios**: Facilitates frontend-backend integration.

## Installation
### Prerequisites
1. Python (>=3.8)
2. Node.js (>=14.x)
3. npm (Node Package Manager)
4. Virtual Environment (optional but recommended)

### Steps
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/salan223/StockAnalyzer.git
   cd stock-analyzer-website
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Create and activate a virtual environment (optional):
     ```bash
     python -m venv venv
     source venv/bin/activate  # On Windows: venv\Scripts\activate
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Start the Flask server:
     ```bash
     flask run
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd stock-analyzer
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the React development server:
     ```bash
     npm start
     ```

4. **Access the Application**:
   Open your web browser and navigate to `http://localhost:3000`.

## Usage
1. Use the search bar to input a stock ticker symbol.
2. View key metrics and visualizations on the stock’s performance.
3. Analyze historical data and predictions.
4. Stay updated with real-time news related to the stock.

## Future Enhancements
- Add authentication for personalized user experiences.
- Implement advanced financial models for better predictions.
- Introduce portfolio tracking and management features.
- Expand data sources for broader market insights.

## Contributing
We welcome contributions to improve this project. To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with detailed information about your changes.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements
- [yFinance](https://pypi.org/project/yfinance/) for stock data.
- [React-ChartJS-2](https://react-chartjs-2.js.org/) for charting capabilities.
- The open-source community for continuous inspiration and support.

---

**Feel free to reach out with questions, suggestions, or feedback.**
