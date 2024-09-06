const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require('./routes/authRouter');
const productRouter = require("./routes/productRouter");
const globalErrorHandler = require("./controllers/errorControl");
const app = express();
require("dotenv").config();
require("./models/db");
app.get("/", (req, res, next) => {
  res.status(200).send("Hello");
  next();
});
app.use(bodyParser.json());
app.use(cors());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use(globalErrorHandler);
const PORT = process.env.PORT || 1000;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
module.exports = app;