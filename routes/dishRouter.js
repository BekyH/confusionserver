const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Dishes = require('../models/dishes');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')

.get((req,res,next)=>{
    Dishes.find({})
    .then((dishes)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dishes);
    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })

})
.post((req,res,next)=>{
    Dishes.create(req.body)
    .then((dish)=>{
        console.log("Dish created ",dish);
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);
    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported');
})
.delete((req,res,next)=>{
    Dishes.remove({})
    .then((rsp)=>{
        res.statusCode = 200;
        res.setHeader('Content-type','application/json');
        res.json(resp);
    },(err)=>{
        next(err);
    }).catch((err)=>{
        next(err);
    })
});
dishRouter.route('/:dishId')
.get((req,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(dish);

    },(err)=>next(err))
    .catch((err)=>next(err));

})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("403 post operation is not supported on the dish: " + req.params.dishId);
})
.put((req,res,next)=>{
    
})
.delete((req,res,next)=>{
    
})
module.exports = dishRouter;