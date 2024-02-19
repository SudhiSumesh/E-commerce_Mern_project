const express = require("express");
const cors = require("cors");
const helmet=require('helmet')
const dotenv = require("dotenv").config();
const DbConnection = require("./Config/dbConnection");
const authRoutes = require("./Routes/authRouter");
const categoryRoutes = require("./Routes/CategoryRoutes");
const ProductRoutes=require('./Routes/ProductRoutes')
const app = express();

//port
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(helmet())
// set cross origin access
app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

//routes

//AUTH ROUTES
app.use("/api/v1/auth", authRoutes);
//CATEGORY ROUTES
app.use("/api/v1/category", categoryRoutes);
//PRODUCT ROUTES
app.use("/api/v1/product",ProductRoutes)

//server
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
  DbConnection(); //connect to db
});
