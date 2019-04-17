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
        }else{
            res.send('添加领养信息成功')
        }
    })
});

//以类别分类获取领养信息
router.get('/',(req,res)=>{
    const classid=req.query.classid;
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
//以用户分类获取领养信息
router.get('/user',(req,res)=>{
    const username=req.query.username;
    DB.find('adoptInfo',{
        "username":username
    },(err,data)=>{
        if(err){
            res.send('查找指定用户领养信息失败')
        }else{
            res.send(data)
        }
    })
});

//获取每个类别的领养信息数量，以及最后一条信息的时间
router.get('/counts',(req,res)=>{
    let counts=[];
   let getCounts=(callback)=>{
        for(let i=1;i<43;i++){
            i=i.toString();
            DB.counts('adoptInfo',{
                "classid":i
            },(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    counts.push(data) 
                     if(i==='42'){
                        callback()
                    }
                }
            })
        }
   }
   getCounts(()=>{
       res.send(counts)
   })
})

router.get('/times',(req,res)=>{
    let times=[];
   let getTime=(callback)=>{
        for(let i=1;i<43;i++){
            i=i.toString();
            DB.find('adoptInfo',{
                "classid":i
            },(err,data)=>{
                if(err){
                    console.log(err)
                }else{
                    let index=data.length-1;
                    let item=data[index];
                    if(item){
                        times.push(item.submitTime)
                    }else{
                        times.push(0)
                    }
                    if(i==='42'){
                        callback()
                    }
                }
            })
        }
   }
   getTime(()=>{
       res.send(times)
   })
})

router.delete('/',(req,res)=>{
    DB.del('adoptInfo',{
        "_id":new DB.ObjectId(req.query._id)
    },err=>{
        if(err){
            res.send('删除领养信息失败')
        }else{
            res.send('删除领养信息成功')
        }
    })
})
module.exports=router;