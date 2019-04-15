let express=require('express');
let router=express.Router();
let DB=require('../module/connectMongo');

router.post('/login',function (req,res) {
   console.log(req.body);
    DB.find('userInfo','',function (err,data) {
        if(err){
            console.log(err);
        }else{
            let a=0;
            let id='';
            for(let item of data){
                if(item.username===req.body.username&&item.password===req.body.password){
                  a=1;id=item._id
                }
            }
            if(a){
                res.send({
                    status:1,
                    msg:'success',
                    userid:id,
                });
            }else{
                res.send({
                    status:0,
                    msg:'false',
                });
            }
        }
    });
});
router.post('/register',function (req,res) {
    console.log(req.body);
    DB.find('userInfo','',function (err,data) {
        if(err){
            console.log(err);
        }else{
            let a=1;
            for(let item of data){
                if(item.username===req.body.username){
                    a=0
                }
            }
            if(a){
                DB.add('userInfo',req.body,function (err) {
                    if(err){
                        console.log(err)
                    }
                    res.json({
                        status:1,
                        msg:'true'
                    });
                });
            }else{
                res.json({
                    status:0,
                    msg:'false'
                });
            }
        }
    });
});
module.exports=router;