const express = require('express');
const bodyParser = require('body-parser');
const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next)=>{

    res.end("will send all promotions to you");
})
.post((req,res,next)=>{
    res.end("will add the promotion");
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end("put operation not supported");
})
.delete((req,res,next)=>{
    res.end("will delete the promotions");
});
promoRouter.route('/:promoId')
.get((req,res,next)=>{
    res.end("will send the promotion: " + req.params.promoId );
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end("4post operation not supported");
})
.put((req,res,next)=>{
    res.end("will update the promotion:" + req.params.promoId);
})
.delete((req,res,next)=>{
    res.end("will delete the promotion: " + req.params.promoId)    
});
module.exports = promoRouter;

