const express =require('express')

const userController = require('../Controllers/userController')

const projectController=require('../Controllers/ProjectController')

const jwtMiddleware =require("../MIDDLEWARES/jwtMiddleware")

const multiconfig =require('../MIDDLEWARES/MulterMiddleware')

//create router object of express to define path
const router =new express.Router()

//using router object to define path

// register API path http://localhost:4000/register ->
router.post('/register',userController.register)



// login API path http://localhost:4000/login ->
router.post('/login',userController.login)


//add user project API  path http://localhost:4000/project/add -frontend->
router.post('/project/add',jwtMiddleware,multiconfig.single('projectImage'), projectController.addUserProject)


//get all users projects path -
router.get('/project/all-user-projects',jwtMiddleware,projectController.getAlluserprojects)

//get all  projects path -
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProjects)

//get all  projects path -
router.get('/project/home-projects',projectController.getHomeProjects)


//update project -
router.put('/project/update-project/:pid',jwtMiddleware,multiconfig.single('projectImage'),projectController.updateProject)

//delete project

router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject
)







module.exports =router