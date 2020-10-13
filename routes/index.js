var express = require('express');
var router = express.Router();
var passport = require('passport')
const dbauth = require('../controllers/controllers.auth')
const session = require("express-session")
const flash = require("express-flash")
app = express()
app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized : false
}))
const initializePassport = require('../middleware/passport-config')
app.use(passport.initialize())
app.use(passport.session())
initializePassport(passport)
app.use(flash())
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('authlogin');
});
router.get('/regisuser', function(req, res, next) {
  res.render('userregister');
});
router.get('/regisadmin', function(req, res, next) {
  res.render('adminregister');
});
router.get('/sucess', function(req, res, next) {
  res.render('sucess');
});
router.post('/login', passport.authenticate("local", {
  successRedirect: "/sucess",
  failureRedirect: "/",
  failureFlash: true
}),dbauth.login)
router.post('/register',dbauth.register)
router.post('/adminregister',dbauth.adminregister)



module.exports = router;
