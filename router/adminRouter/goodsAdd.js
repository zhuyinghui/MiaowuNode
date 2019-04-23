var express=require('express');
var router=express.Router();
var DB=require('../../module/connectMongo');


router.use(function (req,res,next) {
  if(global.adminInfo){
    next()
  }else{
    res.redirect('/adminLogin')
  }
});

router.get('/',function (req,res) {
  res.render('goodsAdd');
});

//添加商品模块
router.post('/do_goodsAdd',function (req,res) {
  var multiparty = require('multiparty');
  var form = new multiparty.Form();
  form.uploadDir = 'static/upload';
  form.parse(req, function (err, fields, file) {
    if(err){
      console.log(err)
    }
    DB.add('goodsInfo', {
      classid:fields.class_id,
      name: fields.goods_name,
      picture: file.goods_img[0].path.substring(14),
      price: fields.goods_price,
      inventory: fields.goods_inventory,
      feature: fields.goods_feature,
      postage: fields.goods_postage
    }, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/goodsAdd')
      }
    });
  });
});
module.exports=router;
