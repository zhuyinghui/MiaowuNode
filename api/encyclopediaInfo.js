var express=require('express');
var router=express.Router();
var DB=require('../module/connectMongo');

router.get('/',function (req,res) {
    DB.find('encyclopediaInfo','',(err,data)=>{
        if(err){
            res.send('获取百科数据失败'+err)
        }else{
            res.send(data);
        }
    })
});

module.exports=router;