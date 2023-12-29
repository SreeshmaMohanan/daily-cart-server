require('dotenv').config()
const express = require("express");
const cors=require('cors')
require('./DB/connection')
const router=require('./Routes/router')

const dc_Server=express()
dc_Server.use(cors())
dc_Server.use(express.json())
//Routes
dc_Server.use(router)
//MongoDB connection
//port 
const PORT = 3002 || process.env.PORT
dc_Server.listen(PORT,()=>{
    console.log(`server is running on port ${PORT} , waiting for client request`)
})
dc_Server.get('/',(req,res)=>{
    res.status(200).send('<h1>Daily cart server started.... and waiting for client request!!!</h1>')
})