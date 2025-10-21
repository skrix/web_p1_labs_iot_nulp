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

const bookRoutes = require("./routes/book.routes");
const userRoutes = require("./routes/user.routes");
const orderRoutes = require("./routes/order.routes");
const orderItemRoutes = require("./routes/orderItem.routes");

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
