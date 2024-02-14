const multer =require('multer')

//to store multer data
const storage = multer.diskStorage({
    destination:(req,File,callback)=>{
        callback(null,'./uploads')
    },
    //craetwe a file name
    filename : (req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

//filter

const fileFilter = (req,file,callback) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg']
    if(allowedMimeTypes.includes(file.mimetype)){
        callback(null,true)
    }
    else{
        callback(null,false)
        return callback(new Error("invalid file type... must be includes png or jpeg or jpg"))
    }
}

const multiconfig = multer ({
    storage,fileFilter
})

module.exports=multiconfig