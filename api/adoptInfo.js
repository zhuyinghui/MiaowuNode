var express=require('express');
var router=express.Router();
var DB=require('../module/connectMongo');

router.post('/',(req,res)=>{
    const username=req.body.username;
    const classid=req.body.classid;
    const words=req.body.words;
    const submitTime=req.body.submitTime;
    DB.add('adoptInfo',{
        username,
        classid,
        words,
        submitTime
    },err=>{
        if(err){
            res.send('添加领养信息失败')
        }
    })
});

router.get('/',(req,res)=>{
    const classid=req.query.classid;
    console.log(classid);
    DB.find('adoptInfo',{
        "classid":classid
    },(err,data)=>{
        if(err){
            res.send('查找领养信息失败')
        }else{
            res.send(data)
        }
    })
});

module.exports=router;