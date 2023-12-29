const mongoose=require('mongoose')
const connection_string=process.env.CONNECTION_STRING


mongoose.connect(connection_string).then((res)=>{
    console.log("Connected to MongoDB")

}).catch((err)=>{
    console.error(`Failed to connect to MongoDB: ${err}`)
})