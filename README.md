# Stock Watcher Dashboard

This is a real-time stock market dashboard that displays stock prices and updates them every three seconds. The application is built with a backend using Node.js, a frontend using React.js, and utilizes PostgreSQL for data management.

## Setup Instructions

To set up and run the application, follow these steps:

### Backend Setup

1. Clone the repository:

  ```bash
  git clone https://github.com/wadesword89/stock-dashboard.git
  ```

2. Navigate to the backend directory:

  ```bash
  cd stock-dashboard/backend
  ```

3. Install the dependencies:

  ```bash
  npm install
  ```

4. Create a `.env` file in the backend directory and add the following environment variables:

  ```bash
  PG_URI=your_postgreSQL_URI
  ```
5. Run the backend server:

  ```bash
  npm start
  ```
6. The backend server should now be running on `http://localhost:3000`.

7. Run the websocket server:

  ```bash
  npm run ws
  ```
### Frontend Setup
1. Navigate to the frontend directory:

  ```bash
  cd stock-dashboard/frontend
  ```
2. Install the dependencies:

  ```bash
  npm install
  ```

3. Run the frontend:

  ```bash
  npm run dev
  ```

4. Open your browser and navigate to `http://localhost:5173` to view the application.

## Features

- Real-time stock price updates
- Add stocks

## Technologies Used

- Node.js
- React.js
- PostgreSQL
- Websockets

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```
