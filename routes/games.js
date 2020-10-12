const express = require('express');
const router = express.Router();
const passport = require('passport');
const gameController = require('../controllers/controllers.game');
const auth = require('../middleware/auth'); 

passport.use(auth.bearer);
console.log(auth.bearer)
const authCheck = passport.authenticate('bearer', { session: false });

router.get('/free', gameController.getGames);
router.get('/check', authCheck, gameController.getGames);
router.get('/aut',auth.roleCheck ,gameController.getGames);
router.get('/aui',auth.adminCheck,gameController.getGames);

module.exports = router;