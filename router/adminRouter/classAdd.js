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
  res.render('classAdd');
});

//添加商品分类模块
router.post('/do_classAdd',function (req,res) {
  var multiparty = require('multiparty');
  var form = new multiparty.Form();
  form.uploadDir = 'static/upload';
  form.parse(req, function (err, fields, file) {
    console.log(file)
    DB.add('goodsClass', {
      classid:fields.classid,
      classname: fields.classname,
      classimg: file.classimg[0].path.substring(14),
      summarize: fields.summarize,
      somatotype: fields.somatotype,
      furlength: fields.furlength,
    }, function (err) {
      if (err) {
        console.log(err)
      } else {
        res.redirect('/classAdd')
      }
    });
  });
});
module.exports=router;
