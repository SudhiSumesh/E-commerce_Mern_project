const express =require('express')
const dotenv=require('dotenv').config()
const app=express()
const PORT=process.env.PORT || 5000

// middlewares
app.use(express.json())

//routes
// app.use('/api/v1')
//server
app.listen(PORT,()=>console.log(`server is running at ${PORT}`))