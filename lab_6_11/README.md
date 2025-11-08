# Lab 6-11:
## Project Structure

```
lab_6_11/
├── backend/          # Node.js/Express API server
├── frontend/         # React application with React Router
└── README.md
```

## Prerequisites

- Node.js (v18+)
- npm
- MySQL database

## Installation

### 1. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with:
# PORT=3000
# JWT_SECRET=your-secret-key-here
# Database configuration (see config/db.config.js)

# Run database migrations
npx sequelize-cli db:migrate

# (Optional) Seed the database
npx sequelize-cli db:seed:all

# Start the server
npm start
```

The backend server will run on `http://localhost:3000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file with:
# VITE_API_URL=http://localhost:3000/api

# Start the development server
npm run dev
```

The frontend application will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/users/sign-up` - Register a new user
- `POST /api/users/sign-in` - Sign in existing user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Brands
- `GET /api/brands` - Get all brands
- `GET /api/brands/:id` - Get brand by ID

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create new order

### Carriers
- `GET /api/carriers` - Get all carriers
- `GET /api/carrier-locations` - Get all carrier locations

## License

This project is for educational purposes.
