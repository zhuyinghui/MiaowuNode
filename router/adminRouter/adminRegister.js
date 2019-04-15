// var express=require('express');
// var router=express.Router();
// var DB=require('../../module/connectMongo');

// router.get('/',function (req,res) {
//   res.render('adminRegister')
// });
// router.post('/do_adminRegister',function (req,res) {
//   var data=req.body;
//   DB.add('adminLogin',data,function (err) {
//     if(err){
//       console.log(err)
//     }else{
//       res.send("<script>alert('注册成功！');location.href='/adminLogin'</script>")
//     }
//   })
// });
// module.exports=router;
