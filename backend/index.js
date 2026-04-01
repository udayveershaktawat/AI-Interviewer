import express from "express";
import dbConnect from "./config/dbconnect.js";
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.route.js"
import morgan from "morgan"
import userRouter from "./routes/user.route.js";



const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(morgan("dev"))

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)



app.use(express.urlencoded({extended:true}))



app.listen(PORT, () => {
  console.log(`server started at Port number ${PORT} Successfully`);
});
dbConnect();

app.get("/", (req, res) => {
  res.send("server created successfully");
});
