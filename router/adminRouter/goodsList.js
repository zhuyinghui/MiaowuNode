var express=require('express');
var router=express.Router();
var DB=require('../../module/connectMongo');
var fs=require('fs');

// router.use(function (req,res,next) {
//   if(global.adminInfo){
//     next()
//   }else{
//     res.redirect('/adminLogin')
//   }
// });

//商品列表模块
router.get('/',function (req,res) {
  DB.find('goodsInfo','',function (err,data) {
    if(err){
      console.log(err);
    }else{
      res.render('goodsList',{
        gl:data
      });
    }
  });
});

//删除商品
router.get('/do_goodsDel',function (req,res) {
  let id=req.query.id;
  let imgName=req.query.imgName;
  DB.del('goodsInfo',{"_id":new DB.ObjectId(id)},function (err) {
    if(err){
      console.log(err)
    }else{
      fs.unlink('static\\upload\\'+imgName,function (err) {
        if(err) return console.log(err);
        console.log('图片删除成功')
      });
      res.redirect('/goodsList')
    }
  })
});
module.exports=router;
