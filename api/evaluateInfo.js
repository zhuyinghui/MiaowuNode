let express=require('express');
let router=express.Router();
let DB=require('../module/connectMongo');
let url=require('url');
router.post('/',function (req,res) {
    // let multiparty = require('multiparty');
    // let form = new multiparty.Form();
    // form.uploadDir = 'static/upload';
    // form.parse(req, function (err, fields, file) {  //异步
    //     let imgs;
    //     if(file){
    //         // console.log(file);
    //         // console.log(file.file[0].path);
    //          imgs=file.file[0].path;
    //     }
    // });
    let ev={};
    if(req.body){
        ev=req.body;
    }
    DB.add('evaluateInfo',{
        userid:ev.userid,
        username:ev.username,
        goodsid:ev.goodsid,
        words:ev.words,
        grade:ev.grade,
        grade2:ev.grade2,
        grade3:ev.grade3,
    },function (err) {
        if(err){
            res.send('评价失败'+err)
        }else{
            res.send('评价成功')
        }
    })
});
router.get('/',(req,res)=>{
    const userid=url.parse(req.url,true).query.userid
    DB.find('evaluateInfo',{
        "userid":userid
    },(err,data)=>{
        if(err){
            res.send('获取用户评论列表失败')
        }else{
            res.send(data)
        }
    })
})
router.get('/goods',(req,res)=>{
    const goodsid=url.parse(req.url,true).query.goodsid
    DB.find('evaluateInfo',{
        "goodsid":goodsid
    },(err,data)=>{
        if(err){
            res.send('获取商品评论列表失败')
        }else{
            res.send(data)
        }
    })
})
router.delete('/',(req,res)=>{
    const goodsid=url.parse(req.url,true).query.goodsid
    const userid=url.parse(req.url,true).query.userid
    DB.del('evaluateInfo',{
        "userid":userid,
        "goodsid":goodsid
    },err=>{
        if(err){
            res.send('删除评论失败')
        }else{
            res.send('删除评论成功')
        }
    })
})
module.exports=router;