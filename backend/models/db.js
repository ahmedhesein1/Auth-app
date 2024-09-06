const mongoose = require("mongoose");
const DB = process.env.LOCAL_DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("mongo connection error");
  });

