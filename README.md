# ICSI 418Y - Programming Assignment 2

This project is a full-stack Login and Signup application built using React, Node.js, Express, and MongoDB.

## Features

- User signup
- User login
- Checks for duplicate usernames
- Validates required fields
- Stores users in MongoDB
- Shows success and error messages

## Technologies Used

- React
- Node.js
- Express
- MongoDB
- CSS

## How to Run

### Backend

Go to the server folder:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Start the server:

```bash
node server.js
```

The backend runs on:

```text
http://localhost:5000
```

### Frontend

Open another terminal and go to the client folder:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Start the React app:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

## Project Structure

```text
icsi418y-pa2
├── client
│   └── React frontend
├── server
│   ├── models
│   │   └── User.js
│   └── server.js
└── README.md
```

## Notes

The `.env` file and `node_modules` folders are not included in the repository.
