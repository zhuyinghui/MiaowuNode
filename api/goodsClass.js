let express=require('express');
let router=express.Router();
let DB=require('../module/connectMongo');

//get获取商品分类
router.get('/',function (req,res) {
    DB.find('goodsClass','',function (err,data) {
        if(err){
            console.log(err);
            res.send({
              status:0,
              msg:err.msg
            })
        }else{
            res.send({
              status:1,
              msg:'success',
              data:data
            });
        }
    });
});

module.exports=router;