const express=require('express');
const router=express.Router()

const DataController= require('../controllers/DataController');
const upload = require('../middleware/upload')

router.get('/',DataController.index)
router.post('/show',DataController.show)
router.post('/store',upload.array('photo[]'),DataController.store)
router.post('/delete',DataController.destory)
router.post('/update',DataController.update)

module.exports=router