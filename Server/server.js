const express = require("express");
const cors = require("cors");
const helmet=require('helmet')
const dotenv = require("dotenv").config();
const DbConnection = require("./Config/dbConnection");
const authRoutes = require("./Routes/authRouter");
const categoryRoutes = require("./Routes/CategoryRoutes");
const ProductRoutes=require('./Routes/ProductRoutes')
const UserRoutes=require('./Routes/UserRoutes')
const cartRoutes=require('./Routes/cartRoutes')
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
//serve static files
app.use(express.static('public'))
//routes

//AUTH ROUTES
app.use("/api/v1/auth", authRoutes);
//CATEGORY ROUTES
app.use("/api/v1/category", categoryRoutes);
//PRODUCT ROUTES
app.use("/api/v1/product",ProductRoutes)
//USERCONTROLL ROUTES
app.use("/api/v1/user-controll",UserRoutes)
//Add To Cart ROUTES
app.use("/api/v1/cart",cartRoutes)
//server
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
  DbConnection(); //connect to db
});
