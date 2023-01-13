const mongoose=require("mongoose");
require('dotenv').config()
const express=require("express")
const app=express()
const { UserModel } = require("./model/user.model");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/User.Route");
const { noteRouter } = require("./routes/Note.route");
const cors=require("cors")
app.use(cors({

    origin:"*"
})) 
app.use("/users",UserRouter)
app.use("/notes",noteRouter)
app.get("/",(req,res)=>{
    res.send("Home Page")
})
app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log("running on port 4900")
    }
    catch(err){
        console.log("Err While connecting to db")
        console.log(err)
    }
})