require('dotenv').config()

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.json({ message: "Hello world!" });
})

const userRoutes = require("./app/routes/user.routes");
const productRoutes = require("./app/routes/product.routes");
const categoryRoutes = require("./app/routes/category.routes");
const brandRoutes = require("./app/routes/brand.routes");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/brands", brandRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
