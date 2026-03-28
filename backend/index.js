import express from "express";
import dbConnect from "./config/dbconnect.js";

const app = express();
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000




app.listen(PORT, () => {
  console.log(`server started at Port number ${PORT} Successfully`);
});
dbConnect();

app.get("/", (req, res) => {
  res.send("server created successfully");
});
