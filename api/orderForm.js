let express=require('express');
let router=express.Router();
let DB=require('../module/connectMongo');
let url=require('url');
router.post('/',function (req,res) {
    const e=req.body;
    const userid=e.userid;
    const dueDate=e.dueDate;
    for(let i=0;i<e.submitlist.length;i++){
        const goodsname=e.submitlist[i].name[0];
        const goodsimg=e.submitlist[i].goodsimgs;
        const count=e.submitlist[i].count;
        const price=e.submitlist[i].price[0];
        const postage=e.submitlist[i].postage[0];
        const goodsid=e.submitlist[i]._id;
        DB.add('orderForm',{
            goodsid,
            userid,
            dueDate,
            goodsname,
            goodsimg,
            count,
            price,
            postage
        },(err)=>{
            if(err){
                res.send('订单添加失败'+err)
            }
        });  
    }
    res.send('订单提交成功')
});
router.get('/',(req,res)=>{
    const userid=url.parse(req.url,true).query.userid
   DB.find('orderForm',{ "userid":userid },(err,data)=>{
       if(err){
           res.send('从数据库获取信息失败'+err)
       }else{
           res.send(data)
       }
   })
});
router.get('/update', function (req, res) {
    const orderid=url.parse(req.url,true).query.orderid
    DB.update('orderForm',{
      "_id":new DB.ObjectId(orderid)
    },{
      $set:{
        "dueDate":0
      }
    },err=>{
      if(err){
        res.send('更新过期时间失败'+err)
      }else{
          res.send('确认收货成功')
      }
    })
  })
router.delete('/',(req,res)=>{
    const orderid=url.parse(req.url,true).query.orderid
    DB.del('orderForm',{
        "_id":new DB.ObjectId(orderid)
    },err=>{
        if(err){
            res.send('删除订单失败'+err)
        }else{
            res.send('删除订单成功')
        }
    })
})
module.exports=router;