const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: "Hello world!" });
})

// const itemRoutes = require("./src/routes / item.routes");

// //** add next line only after creating Routes **
// app.use('your middleware route', itemRoutes);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
