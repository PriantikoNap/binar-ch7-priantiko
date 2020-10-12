var express = require('express');
var router = express.Router();
const dbauth = require('../controllers/controllers.auth')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/login',dbauth.login)
router.post('/register',dbauth.register)
router.post('/adminregister',dbauth.adminregister)



module.exports = router;
