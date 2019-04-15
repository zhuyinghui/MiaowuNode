let express=require('express');
let router=express.Router();
let DB=require('../module/connectMongo');
let url=require('url');
//get获取商品信息列表
router.get('/',function (req,res) {
    DB.find('goodsInfo','',function (err,data) {
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
router.get('/goods',(req,res)=>{
  const goodsid=url.parse(req.url,true).query.goodsid
  DB.find('goodsInfo',{
    "_id":new DB.ObjectId(goodsid)
  },(err,data)=>{
    if(err){
      res.send('获取指定商品失败')
    }else{
      res.send(data)
    }
  })
})
module.exports=router;