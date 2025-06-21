require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

const app = express()

connectDB()

// Middleware
app.use(cors(corsOptions))
app.use(express.json())

app.use("/api/todos", require("./routes/todoRoutes"));

mongoose.connection.once("open", () => {
  console.log("Connected to DB!");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  console.log("Error in connection: ", error);
});