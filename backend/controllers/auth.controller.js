import genToken from "../config/token.js"
import User from "../models/user.model.js"








export const googleAuth =async(req,res,)=>{
    try {

        const {name,email} = req.body
        let user = await User.findOne({email})
        if(!user){
             user = await User.create({
                  name,
                email,
              
            })
        }
        let token = await genToken(user._id)

       


       res.cookie("token", token, {
    httpOnly: true,   // ✅ correct
    secure: false,    // keep false for localhost
    sameSite: "lax",  // better for development
    
});

 console.log(token)

       return res.status(201).json({
            success:true,
            message:"user created successfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"error while creating user"
        })
        
        
    }
}


// logout 

export const logOut = async(req,res)=>{
    try {
        await res.clearCookie("token")
        return res.status(200).json({
            success:true,
            message:"logout successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error while logging out"
        })
        
    }
}