const express = require('express');
const createError = require('http-errors');
const path = require('path');


const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
const userRouter = require('./routes/userRouter');
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const hostname = 'localhost';
const port = 3000;

const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then((db)=>{
    console.log("correctly connected to the mongodb server");

},(err)=>{
    console.log(err);
});
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
//app.use(cookieParser('12345-67890-09876-54321'));

app.use(passport.initialize());

app.use((req,res,next)=>{
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
     res.end('<html><body><h1>This is an express server</h1></body></html>');
});
app.use('/users',userRouter);


app.use('/dishes',dishRouter);
app.use('/promotions',promoRouter);
app.use('/leaders',leaderRouter);




const server = http.createServer(app);
server.listen(port,hostname,()=>{
    console.log("the server is running at http://" + hostname + ":" + port);
});