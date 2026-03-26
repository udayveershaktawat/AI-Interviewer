import express from "express"


const app = express();


app.listen(4000,()=>{
    console.log("server started successfully")
})


app.get("/",(req,res)=>{
    res.send("server created successfully")
})