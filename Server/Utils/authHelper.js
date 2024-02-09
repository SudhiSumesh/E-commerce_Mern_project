const bcrypt=require('bcrypt')
//hash password
exports.hashPassword= async (password)=>{
try {
    
    const hashedPassword=await bcrypt.hash(password,10)
 return hashedPassword
} catch (error) {
    console.log(error);
}
}
//compare password
exports.comparePassword=async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}