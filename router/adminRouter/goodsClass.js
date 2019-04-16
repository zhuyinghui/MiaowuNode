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

//分类列表
router.get('/',function (req,res) {

  DB.find('goodsClass','',function (err,data) {
    if(err){
      console.log(err);
      // res.json({
      //   status:1,
      //   msg:err.msg
      // })
    }else{
      // res.json({
      //   status:0,
      //   msg:'success',
      //   data:data
      // });
      res.render('goodsClass',{
        gc:data
      });
    }
  });
});

//删除分类
router.get('/do_classDel',function (req,res) {
  let id=req.query.id;
  let imgName=req.query.imgName;
  DB.del('goodsClass',{"_id":new DB.ObjectId(id)},function (err) {
    if(err){
      console.log(err)
    }else{
      fs.unlink('static\\upload\\'+imgName,function (err) {
        if(err) return console.log(err);
        console.log('图片删除成功')
      });
      res.redirect('/goodsClass');
    }
  })
});
module.exports=router;
