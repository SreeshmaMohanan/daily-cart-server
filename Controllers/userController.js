const users=require('../Models/userModel')
const jwt= require('jsonwebtoken')

//register
exports.registerController=async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const existingUser=await users.findOne({email})
        if (existingUser) {
            return res.status(406).json({msg:"Email is already in use"});
        }else{
            const newUser = new  users({
                username,email,password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(err){
        res.status(401).json(err)
    }

}
//login
exports.loginController=async(req,res)=>{
    const { email, password } = req.body;
    // Get the user by email from the database
    try{
        const existingUser=await users.findOne({email,password})
        if (existingUser) {
            let token=jwt.sign({userId:existingUser._id},process.env.JWT_SECRET_CODE)
            res.status(200).json({
                existingUser,token
            })

        }else{
            res.status(404).json("incorrect email/password")
        }

    }catch(err){
        res.status(401).json(err)
    }
}