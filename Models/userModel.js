const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,unique:true,lowercase: true, required: [true, "can't be blank"] },
    password:{ type : String , required: true}  //password is hashed before saving to database
})
const users= mongoose.model("users",userSchema)
module.exports= users