const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
const imageFileFilter = (req,file,cb)=>{
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)){
        return cb(new Error("You can only upload image files"),false);
        
    }
    cb(null,true);

};

const upload = multer({storage:storage,fileFilter:imageFileFilter});


const uploadRouter = express.Router();
 uploadRouter.use(bodyParser.json());
 uploadRouter.route('/')
 .get((req,res,next)=>{
     res.statusCode = 403;
     res.end("get request not supported in /imageupload");
 })
 .post(upload.single('imageFile'),(req,res)=>{
     res.statusCode = 200;
     res.setHeader('Content-Type','application/json');
     res.json(req.file);

 })
 .put((req,res,next)=>{
     res.statusCode = 403;
     res.end("put request not supported in /imageupload");
 })
 .delete((req,res,next)=>{
     res.statusCode = 403;
     res.end("delete request not supported in /imageupload");
 })


 module.exports = uploadRouter;