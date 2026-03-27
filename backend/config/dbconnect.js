import mongoose from "mongoose"

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("db Connected successfully")
    })
    .catch((error)=>{
        console.log(error)
        console.log("error while connecting db")
        process.exit(1)
    })
}

export default dbConnect;