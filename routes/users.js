const express = require('express');
const router = express.Router();
const dbuser = require('../controllers/User')


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
router.get('/',dbuser.user);
router.get('/:id', dbuser.userId)
router.put('/update/:id',dbuser.updateUser)
router.delete('/delete/:id', dbuser.deleteUser)


module.exports = router;
