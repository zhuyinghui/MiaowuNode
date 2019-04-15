var express=require('express');
var router=express.Router();
var DB=require('../../module/connectMongo');
var app=new express();

router.get('/',function (req,res) {
  res.render('adminLogin');
});
router.post('/do_adminLogin',function (req,res) {
  var data=req.body;
  DB.find('adminLogin',data,function (err,data) {
    if(err){
      console.log(err)
    }else{
      if(data.length>0){
        global.adminInfo=data[0];
        res.send("<script>alert('登录成功');location.href='/goodsList'</script>");
      }else{
        res.send("<script>alert('登录失败');location.href='/adminLogin'</script>")
      }
    }
  });
});
module.exports=router;
