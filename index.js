const express = require('express');
const createError = require('http-errors');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Dishes = require('./models/dishes');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const hostname = 'localhost';
const port = 3000;

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("correctly connected to the mongodb server");

},(err)=>{
    console.log(err);
});
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);
app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
     res.end('<html><body><h1>This is an express server</h1></body></html>');
});



const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log("the server is running at http://" + hostname + ":" + port);
});