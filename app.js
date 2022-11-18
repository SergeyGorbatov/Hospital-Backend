const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./src/modules/router/index");
const errorMiddleware = require("./src/middlewares/error-middleware");
const { PORT, DB_URL, CLIENT_URL } = require("./config");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
  })
);
app.use(router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
