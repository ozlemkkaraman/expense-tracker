# Expense Tracker API

A RESTful API for tracking personal expenses, built with Node.js, Express, and MongoDB. Users can register, log in, and manage their own expenses securely using JWT authentication.

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication
- Protected routes — users can only access their own data
- Full CRUD operations for expenses
- Expense categorization with predefined categories

## Tech Stack

- **Node.js** + **Express** — server and routing
- **MongoDB** + **Mongoose** — database and schema modeling
- **bcryptjs** — password hashing
- **jsonwebtoken** — authentication
- **dotenv** — environment variable management

## Project Structure

```
expense-tracker/
├── config/
│   └── db.js                 # MongoDB connection
├── controllers/
│   ├── authController.js     # Register & login logic
│   └── expenseController.js  # Expense CRUD logic
├── middleware/
│   └── authMiddleware.js     # JWT verification
├── models/
│   ├── User.js
│   └── Expense.js
├── routes/
│   ├── authRoutes.js
│   └── expenseRoutes.js
├── server.js
└── .env                      # Not tracked — see below
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ozlemkkaraman/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Run the server

```bash
npx nodemon server.js
```

The server will start on `http://localhost:5000` (or the port you specified).

## API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint    | Description         | Auth Required |
|--------|-------------|----------------------|----------------|
| POST   | `/register` | Register a new user | No             |
| POST   | `/login`    | Log in and get a token | No          |

**Register — Request body:**
```json
{
  "name": "Ahmet",
  "email": "ahmet@mail.com",
  "password": "123456"
}
```

**Login — Request body:**
```json
{
  "email": "ahmet@mail.com",
  "password": "123456"
}
```

**Login — Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Expense Routes (`/api/expenses`)

All expense routes require a valid JWT token in the `Authorization` header:
```
Authorization: Bearer <your_token>
```

| Method | Endpoint | Description               |
|--------|----------|----------------------------|
| GET    | `/`      | Get all expenses for the logged-in user |
| POST   | `/`      | Create a new expense       |
| PUT    | `/:id`   | Update an expense (owner only) |
| DELETE | `/:id`   | Delete an expense (owner only) |

**Create expense — Request body:**
```json
{
  "title": "Groceries",
  "amount": 250,
  "category": "food"
}
```

Available categories: `food`, `transport`, `entertainment`, `bills`, `other`

## Security Notes

- Passwords are never stored in plain text — they're hashed with bcrypt before saving.
- Each expense is tied to a `user` field, and ownership is verified before any update or delete operation.
- The `.env` file is excluded from version control via `.gitignore` to keep credentials safe.

## License

This project is for learning/practice purposes.
