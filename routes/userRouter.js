const express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/users'); 
var userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.get('/',(req,res,next)=>{
    res.send('respond with a resource');
});
userRouter.post('/signup',(req,res,next)=>{
    User.findOne({username:req.body.username})
    .then((user)=>{
        if(user!=null){
            res.statusCode = 403;
            res.end("User " + req.body.username + " already exists");
        }
        else{
            return User.create({username:req.body.username,password:req.body.password})
        }
    })
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json({status:'Registeration Successful',user:user});

    })
    .catch((err)=>next(err));
});

userRouter.post('/login',(req,res,next)=>{
    if(!req.session.user){
        var authHeader = req.headers.authorization;
    if(!authHeader){
        res.statusCode = 401;
        res.setHeader('WWW-authenticate','Basic');
        res.end("you are not authenticated");

    }

    var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];
    User.findOne({username:username})
    .then((user)=>{
        if(user ===null){
            res.statusCode = 403;
            res.setHeader("Content-Type","text/plain");
            res.end("User" + username + ' doesnot exist'); 
        }
        else if(user.password!=password){
            res.statusCode = 403;
            res.setHeader("Content-Type","text/plain");
            res.end("your password is incorrect"); 
        }
        else if(user.username===username  && user.password===password){
            req.session.user = 'authenticated';
             res.statusCode = 200;
             res.setHeader('Content-Type','text/plain');
             res.end("you are authenticated");
    
        }
        
    }).catch((err)=>{
        Console.log(err);
    })
    

    } 

else{
    res.statusCode = 200;
    res.setHeader("Content-Type","text/plain");
    res.end("you are already authenticated");
}
});

userRouter.get('/logout',(req,res)=>{
    if(req.session){
        req.session.destroy();
        res.clearCookie('session-id');
        res.redirect('/'); 
    }
    else{
        res.statusCode = 403;
        res.setHeader("Content-Type","text/plain");
        res.end("You are not logged in");
    }
})