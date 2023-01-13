const mongoose=require("mongoose");
const express=require("express")
const bcrypt=require("bcrypt");
const { UserModel } = require("../model/user.model");
const UserRouter=express.Router()
UserRouter.use(express.json())
const jwt=require("jsonwebtoken")

UserRouter.get("/", async (req, res) => {
    let users=await UserModel.find()
      res.send(users);
    });
UserRouter.post("/login",async(req,res)=>{
    let {email,pass}=req.body;
    try{
    const user =await UserModel.find({email})
    if(user.length>0){
    bcrypt.compare(pass,user[0].pass,(err,result)=>{
    if(result){
        const token =jwt.sign({userID:user[0]._id},"masai",{expiresIn:"1h"})
        res.send(({"msg":"Login Succesfully","token":token}))
    }
    else {
        res.send("Wrong Credntials")
    }
    })
    }
    }catch(err){
        res.send({"err":err})
    }
    })
    UserRouter.post("/resistor",async(req,res)=>{
    const {email,name,age,pass}=req.body;
    try{
    bcrypt.hash(pass,5,async(err,secure_password)=>{
    if(err){
        console.log(err);
    }else {
        const user=new UserModel({name,pass:secure_password,age,email})
        await user.save()
        res.send("Resistered")
    }
    })
    }catch(err){
        res.send("Error While Resistroring The User")
        console.log(err)
    }
    })
    module.exports={UserRouter}

    // 63c0328b1cf87dc5efcc7d5e