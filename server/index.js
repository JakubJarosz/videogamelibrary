const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const routes = require("./routes/authRoutes");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser")
const app = express();

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

app.use("/", routes);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is running on port ${port}`));
