# Pennywise - Expense Tracker

Pennywise is a full-stack expense tracking application designed to help users manage their finances effectively. It includes features like individual and shared expense tracking, budget management, and detailed visualizations of financial data.

## Features

- **Expense Tracking**: Log and categorize expenses with ease.
- **Budget Management**: Create and monitor budgets, including shared budgets with a partner.
- **Partner System**: Link accounts with a partner to view and manage combined expenses.
- **Interactive Charts**: Visualize expenses and budgets with dynamic charts.
- **User Authentication**: Secure login and registration.
- **Responsive Design**: Optimized for desktop and mobile.

## Tech Stack

### Frontend
- **React** with **Material UI** for a modern and responsive UI.
- **Chart.js** for dynamic data visualization.

### Backend
- **Node.js** with **Express** for RESTful APIs.
- **MySQL** for robust data storage and management.

### Tools and Libraries
- **SweetAlert2** for stylish alerts.
- **JWT Authentication** for secure user sessions.
- **Axios** for HTTP requests.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/pennywise.git
   cd pennywise
   ```

2. Install dependencies for both frontend and backend:
   - **Backend**:
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```

3. Configure the `.env` files:
   - Backend: Add your database credentials, JWT secret, and other configuration details.
   - Frontend: Add API base URL.

4. Run the app:
   - **Backend**:
     ```bash
     npm start
     ```
   - **Frontend**:
     ```bash
     npm start
     ```

## Usage

- Create an account or log in.
- Add, edit, or delete expenses.
- Create budgets and monitor spending.
- View expenses through detailed charts and summaries.

## Screenshots

*(Add screenshots of your app here to showcase its design and functionality.)*

## Future Improvements

- Export expenses to CSV or PDF.
- Add currency conversion for international users.
- Improve accessibility and add dark mode.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---