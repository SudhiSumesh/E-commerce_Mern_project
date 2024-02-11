const express = require("express");
const cors=require('cors')
const dotenv = require("dotenv").config();
const DbConnection = require("./Config/dbConnection");
const authRoutes = require("./Routes/authRouter");
const app = express();

//port
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());

// set cross origin access 
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//routes
app.use("/api/v1/auth", authRoutes);

//server
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
  DbConnection(); //connect to db
});
