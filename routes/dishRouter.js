const express = require('express');
const bodyParser = require('body-parser');
const dishRouter = express.Router();
dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end("will send all dishes to you");
})
.post((req,res,next)=>{
    res.end('will add the dish: ' + req.body.name);

})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported');
})
.delete((req,res,next)=>{
    res.end("deleting all the dishes");
});
dishRouter.route('/:dishId')
.get((req,res,next)=>{
    res.end("will send the dish: " + req.params.dishId);

})
.post((req,res,next)=>{
    res.end("403 post operation is not supported on the dish: " + req.params.dishId);
})
.put((req,res,next)=>{
    res.end("will update the disha: " + req.params.dishId);
})
.delete((req,res,next)=>{
    res.end("delete the dish: " + req.params.dishId);
})
module.exports = dishRouter;