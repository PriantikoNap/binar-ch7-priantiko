const express = require('express');
const router = express.Router();
const dbbiodata =  require('../controllers/controllers.biodata')

router.get('/',dbbiodata.biodata);
router.get('/:id', dbbiodata.biodataId)
router.post('/addhistory',dbbiodata.addBiodata)
router.put('/update/:id',dbbiodata.updateBiodata)
router.delete('/delete/:id', dbbiodata.deleteBiodata)

module.exports = router;