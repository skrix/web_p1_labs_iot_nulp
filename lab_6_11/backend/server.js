require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

app.get('/api', (req, res) => {
  res.json({ message: "Hello world!" });
})

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

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = app;
