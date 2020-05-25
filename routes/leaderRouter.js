const express = require('express');
const bodyParser = require('body-parser');
const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());
leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})

.get((req,res,next)=>{
    res.end("will send all leaders to you");
})
.post((req,res,next)=>{
    res.end('will add the leader: ');

})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not supported');
})
.delete((req,res,next)=>{
    res.end("deleting all the leaders");
});
leaderRouter.route('/:leaderId')
.get((req,res,next)=>{
    res.end("will send the leader: " + req.params.leaderId);

})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end(" post operation is not supported on the leader: " + req.params.leaderId);
})
.put((req,res,next)=>{
    res.end("will update the leader: " + req.params.leaderId);
})
.delete((req,res,next)=>{
    res.end("delete the leader: " + req.params.leaderId);
})
module.exports = leaderRouter;