const projects=require('../MODELS/projectSchema')

exports.addUserProject =async(req,res)=>{
    console.log("Inside addUserProject");

    //get userId

    const userId =req.payload
    //get ProjectImage

  const projectImage=req.file.filename

    //get project details
    const{title,language,github,link,overview}=req.body
    console.log(userId,title,language,github,link,overview,projectImage);

   // logic for adding projects

    // res.status(200).json("Add user project request recieved")






   try{
    //if Gitub is present in mongodb
    const existingProject=await projects.findOne({github})
    if(existingProject){
        res.status(402).json("Project already exist")
    }
    else{
        //if github is not present in mongoDb Then create new project details and save them in mongoDB
        const newproject=new projects({
            title,language,github,link,overview,projectImage,userId
        })
        await newproject.save()//save new project in mongoDB
        res.status(200).json(newproject)//response send to client
    }

   }
   catch(err){

    res.status(404).json({message:err.message})


   }



}


//get all user-projects

exports.getAlluserprojects = async(req,res)=>{
    //get userid
    const userId =req.payload;
    //get all projects of particular user
    try{
        //api call
        const userProject =await projects.find({userId})
        res.status(200).json(userProject) // send all projects to frontend

    }
    catch(err){
        res.status(401).json("Internal server Error" +err.message)

    }
}

//get all projects

exports.getAllProjects =async(req,res)=>{


    const searchKey =req.query.search

    const query ={
        language:{
            $regex:searchKey,
            $options:"i"
        }
    }



    try{
        const allProjects =await projects.find(query)
        res.status(200).json(allProjects)

    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message)

    }
}


//get home project

exports.getHomeProjects =async(req,res)=>{

    try{
        const homeProject =await projects.find().limit(3)
        res.status(200).json(homeProject
            )

    }
    catch(err){
        res.status(401).json("Internal server Error"+err.message)

    }

}

// update Project details
exports.updateProject = async (req,res)=>{
    const {title,language,github,overview,projectImage}=req.body
    const uploadImage = req.file?req.file.filename:projectImage
    userId = req.payload
    const {pid} = req.params

    try{
        //find the particular project and update the project   details then save to mongoDB
     const updateProject = await projects.findByIdAndUpdate({_id:pid},{title,language,github,overview,projectImage:uploadImage,userId})
     //To ave the project details to mongoDB
     await updateProject.save()
     //response send back to client
     res.status(200).json(updateProject)
    }
    catch(err){
        res.status(401).json("Internal server Error" +err.message)
    }


}

//delete the project

exports.deleteProject = async(req,res)=>{
    const {pid} =req.params
    try{
        const deleteUserProject = await projects.findOneAndDelete({_id:pid})
        res.status(200).json(deleteUserProject)

    }
    catch(err){
        res.status(401).json("Internal server Error" +err.message)

    }
}



