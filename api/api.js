let express=require('express');
let router=express.Router();
  
router.use('/goodsList',require('./goodsLists'));

router.use('/goodsClass',require('./goodsClass'));

router.use('/userInfo',require('./userInfo'));

router.use('/evaluateInfo',require('./evaluateInfo'));

router.use('/orderForm',require('./orderForm'));

router.use('/encyclopediaInfo',require('./encyclopediaInfo'));

router.use('/adoptInfo',require('./adoptInfo'));

//添加商品模块
router.post('/upfile',function (req,res) {
  var multiparty = require('multiparty');
  var form = new multiparty.Form();
  form.uploadDir = 'static/upfile';
  form.parse(req, function (err, fields, file) {
    if(err){
      console.log(err)
    }
    console.log(fields);
	console.log(file);
	res.send('提交成功');
  });
});
router.get('/upfile',function(req,res){
	res.send('upfile的数据')
})

module.exports=router;