let express=require('express');
let router=express.Router();
  
router.use('/goodsList',require('./goodsLists'));

router.use('/goodsClass',require('./goodsClass'));

router.use('/userInfo',require('./userInfo'));

router.use('/evaluateInfo',require('./evaluateInfo'));

router.use('/orderForm',require('./orderForm'));

router.use('/encyclopediaInfo',require('./encyclopediaInfo'))

module.exports=router;