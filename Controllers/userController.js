// Define logic functions

const users = require("../MODELS/userSchema");
const jwt=require('jsonwebtoken')

//Register logic function
exports.register =async(req,res)=>{
    console.log("inside register functions");
    try{

        const{username,email,password}=req.body
        console.log(`${username} ${email} ${password}`);
        const existingUser=await users.findOne({email})
        if(existingUser){
            res.status(402).json("User already existing")
        }
        else{
            const newUser=new users ({
                username,email,password,github:"",link:"",profile:""
            })
            await newUser.save() //data saved in mongoDB
            res.status(200).json("User Created successfully")
        }
        


    }
    catch(err){
        res.status(500).json("Server error")

    }
}


//Login logic function

exports.login =async(req,res)=>{
    const{email,password}=req.body


    try{
        const User=await users.findOne({email,password})
        if(User){
            const token = jwt.sign({userId:User._id},"superkey2024")
            console.log(token);
            res.status(200).json({User,token})


        }
        else{
            res.status(401).json("Invalid user")
        }


    }
    catch(err){
        res.status(500).json("server error" +err.message)

    }



}