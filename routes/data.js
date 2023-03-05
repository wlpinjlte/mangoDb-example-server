const express=require('express');
const router=express.Router()

const DataController= require('../controllers/DataController');

router.get('/',DataController.index)
router.post('/show',DataController.show)
router.post('/store',DataController.store)
router.post('/delete',DataController.destory)
router.post('/update',DataController.update)

module.exports=router