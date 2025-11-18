require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Health check endpoint
app.get('/api', (req, res) => {
  res.json({ message: "Hello world!", timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

const userRoutes = require("./app/routes/user.routes");
const productRoutes = require("./app/routes/product.routes");
const productItemRoutes = require("./app/routes/productItem.routes");
const categoryRoutes = require("./app/routes/category.routes");
const brandRoutes = require("./app/routes/brand.routes");
const carrierRoutes = require("./app/routes/carrier.routes");
const carrierLocationRoutes = require("./app/routes/carrierLocation.routes");
const orderRoutes = require("./app/routes/order.routes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/product-items", productItemRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/carriers", carrierRoutes);
app.use("/api/carrier-locations", carrierLocationRoutes);
app.use("/api/orders", orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
