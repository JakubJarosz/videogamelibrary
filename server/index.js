const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const routes = require("./routes/authRoutes");
const { mongoose } = require("mongoose");
const app = express();

//database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database not connected", err));

//middleware
app.use(express.json());

app.use("/", routes);

const port = 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
