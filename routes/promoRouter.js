const express = require('express');
const bodyParser = require('body-parser');
const promotions = require('../models/promotion');
var authenticate = require('../authenticate');
const cors = require('./cors');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')

.get(cors.cors,(req,res,next)=>{
    promotions.find({})
    .then((promotions)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,(req,res,next)=>{
    promotions.create(req.body)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end("put operation not supported");
})
.delete(cors.corsWithOptions,(req,res,next)=>{
    promotions.remove({})
    .then((resp)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
promoRouter.route('/:promoId')
.get(cors.cors,(req,res,next)=>{
    promotions.findById(req.params.promoId)
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode = 403;
    res.end("4post operation not supported");
})
.put(cors.corsWithOptions,(req,res,next)=>{
    promotions.findByIdAndUpdate(req.params.promoId,{
        $set:req.body
    },{new:true})
    .then((promotion)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type","application/json");
        res.json(promotion);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete(cors.corsWithOptions,(req,res,next)=>{
        promotions.findByIdAndRemove(req.params.promoId)
        .then((resp)=>{
            res.statusCode = 200;
            res.setHeader("Content-type","application/json");
            res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));
});
module.exports = promoRouter;

