import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    credits:{
        type:Number,
        default:1000
    }


},{timestamps:true})


// userSchema.methods.generateToken = function(){
//     const token= jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:"7d"})

//     return token
// }


const User = mongoose.model("User",userSchema);

export default User;