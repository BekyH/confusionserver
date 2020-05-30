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