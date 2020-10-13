const express = require('express');
const router = express.Router();
const dbhistory =  require('../controllers/controllers.history')

router.get('/',dbhistory.history);
router.get('/:id', dbhistory.historyId)
router.post('/addhistory',dbhistory.addHistory)
router.put('/update/:id',dbhistory.updateHisotry)
router.delete('/delete/:id', dbhistory.deletehistory)

module.exports = router;