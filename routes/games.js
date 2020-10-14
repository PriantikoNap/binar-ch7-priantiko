const express = require('express');
const router = express.Router();
const gameController = require('../controllers/controllers.game');
const auth = require('../middleware/auth'); 

// passport.use(auth.bearer);
// console.log(auth.bearer)
// const authCheck = passport.authenticate('bearer', { session: false });

router.get('/', gameController.getGames);
router.post('/createroom', auth.roleCheck,gameController.createRoom);
router.get('/fight/:id', auth.roleCheck, gameController.fightRoom);


module.exports = router;