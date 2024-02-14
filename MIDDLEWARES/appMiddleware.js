const appMiddleware =(req,res,next)=>{
    console.log("Inside the appliction middleware");
    next()
}



module.exports=appMiddleware