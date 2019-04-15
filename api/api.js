let express=require('express');
let router=express.Router();
let url=require('url');
let DB=require('../module/connectMongo');
  
router.use('/goodsList',require('./goodsLists'));

router.use('/goodsClass',require('./goodsClass'));

router.use('/userInfo',require('./userInfo'));

router.use('/evaluateInfo',require('./evaluateInfo'));

router.use('/orderForm',require('./orderForm'));

module.exports=router;