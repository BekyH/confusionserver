var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var user = require('./models/users');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var FacebookTokenStrategy = require('passport-facebook-token');


var config = require('./config.js');
exports.local = passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser()); // determines which data of the user object should be stored in the session
passport.deserializeUser(user.deserializeUser());

exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 3600});
};
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});
exports.facebookPassport = passport.use(new FacebookTokenStrategy(
    {
    clientID:config.facebook.clienId,
    clientSecret:config.facebook.clientSecret
},
    (acessToken,refreshToken,profile,done)=>{
        user.findOne({facebookId:profile.id},(err,  User)=>{
            if(err){
                return done(err,false);
            }
            if(!err && !User==null){
                return done(null,User);
            }
            else{
                user = new user({username:profile.displayName});
                user.facebookId = profile.id;
                user.firstname = profile.name.givenName;
                 user.lastname = profile.name.familyName;
                 user.save((err,user)=>{
                     if(err){
                         return done(err,false);
                     }
                     else{
                         return done(null,user);
                     }
                 })
            }
        });
    }

));