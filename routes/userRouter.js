const express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/users'); 
var passport = require('passport');
var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/',(req,res,next)=>{
    res.send('respond with a resource');
});
userRouter.post('/signup',(req,res,next)=>{
    User.register(new User({username:req.body.username}),req.body.password,(err,user)=>{

    
    
        if(err){
            res.statusCode = 500;
            res.setHeader("Content-Type","application/json");
            res.json({err:err});

        }
        else{
            passport.authenticate('local')(req,res,()=>{
                res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json({success:true,status:'Registeration Successful',user:user});
            });
        }
    });
    
  
});

userRouter.post('/login', passport.authenticate('local'),(req,res)=>{
    res.statusCode = 200;
    res.setHeader("Content-Type","application/json");
    res.json({success:true,status:'Login Successful'});
});

userRouter.get('/logout',(req,res)=>{
    if(req.session){
        req.session.destroy();
        res.clearCookie('session-id');
        res.end('you are logout'); 
    }
    else{
        res.statusCode = 403;
        res.setHeader("Content-Type","text/plain");
        res.end("You are not logged in");
    }
});
module.exports = userRouter;