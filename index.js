//loads .env file contents into process.env by default
   require('dotenv').config()

// import express
const express =require('express')

const cors= require('cors')


const db=require("./DB/Connection")
const router=require('./Routes/router')

const appMiddleware=require("./MIDDLEWARES/appMiddleware")





//create a backend application using the express

const pfserver =express()

//use cors

pfserver.use(cors())
pfserver.use(express.json()) //returs middleware that only parses json
pfserver.use(appMiddleware)
pfserver.use(router)
pfserver.use('/uploads',express.static('./uploads'))

//port creation
const PORT = 4000 || process.env.PORT

//server listening
pfserver.listen(PORT,()=>{
    console.log("listening on port" + PORT);
})

//localhost:4000 -> res pfserver is started

pfserver.get('/',(req,res)=>{
    res.send(`<h1>Project fair server started</h1>`)
})