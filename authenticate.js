var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('./models/users');
var JwtStrategy = require('passport-jwt').Strategy;
var extractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var config = require('./config');
exports.local = passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser()); // determines which data of the user object should be stored in the session
passport.deserializeUser(user.deserializeUser());

exports.getToken = function(user){
    return jwt.sign(user,config.secretKey,{expiresIn:3600});

};
var opts = {};
opts.jwtFromRequest = extractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log("JWT payload: ",jwt_payload);
    user.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            return done(err,false);

        }
        else if(user){
            return done(null,user);
        }
        else{
            return done(err,false);
        }
    });

}));

exports.verifyUser = passport.authenticate('jwt',{session:false});