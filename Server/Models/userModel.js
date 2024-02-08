const mongoose =require('mongoose')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Please enter you Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [3, "Name should  have more 3 characters"],
    },
   email:{
    type:String,
    required:[true,"pleace ente your email"],
    unique:true,
    
   },
   password:{
    type:String,
    required: [true, "Please enter you Password"],
    minLength: [3, "Paasword should be greater than 3 characters"],
   
   },
  avatar: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        default:"https://tse4.mm.bing.net/th?id=OIP.tgmmCh4SA36j0dMT0ay9_AHaHa&pid=Api&P=0&h=180"
        // required: true,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  }
}) 

module.exports=mongoose.model("User",userSchema)