const JWT=require('jsonwebtoken');
const userModel = require('../Models/userModel');

//protected routes token base

exports.requireSignIn= async (req,res,next)=>{
    const token= req.headers.authorization
    if(!token){
        res.status(401).json({
            success:false,
            message:"Invalid token"
        })
        
    }
        try {
      
        const decode= JWT.verify(token,process.env.JWT_SECRET_KEY)
        
        req.user=decode
        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"invalid token",
            error
        })
    }
}

//admin access
exports.isAdmin=async(req,res,next)=>{
    try {
        const user= userModel.findById(req.user.Id)

        if(user.role !==1){
            return res.status(401).json({
                success:false,
                message:"Unauthorized Access"
            })
        }
        else{
            next()
        }
    } catch (error) {
        console.log(error);
    }
}