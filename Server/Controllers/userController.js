

//register user
exports.registerUser=async (req,res)=>{
    const {name,email,password,phone,img}=req.body
    res.send('👌')
}

//Login user
exports.loginUser=async (req,res)=>{
    const {email,password}=req.body
// Checking if user has given password and  email both
    if(!email||!password ){
        return // need to do error handling here
    }
 // [2]- find user from db using findOne method
//  {..........code.......}   
// [3] - if user not found=>
if(!user){
    return // need to do error handling here
}
//[4]-check the password is match
// id not match do return
//or if matches send token
}