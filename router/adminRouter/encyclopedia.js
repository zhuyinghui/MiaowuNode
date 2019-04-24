var express=require('express');
var router=express.Router();
var DB=require('../../module/connectMongo');

router.use(function (req,res,next) {
  if(global.adminInfo){
    next()
  }else{
    res.redirect('/adminLogin')
  }
});
router.get('/',function (req,res) {
    DB.find('encyclopediaInfo','',(err,data)=>{
        if(err){
            res.send('获取百科数据失败'+err)
        }else{
            res.render('encyclopediaList',{
                el:data
            });
        }
    })
});

router.get('/add',(req,res)=>{
    res.render('encyclopediaAdd');
})

router.post('/do_add',(req,res)=>{
    var multiparty = require('multiparty');
    var form = new multiparty.Form();
    form.uploadDir = 'static/upload';
    form.parse(req, function (err, fields, file) {
    if(err){
        res.send('获取百科表单信息失败'+err)
    }
    const classid=fields.class_id[0];
    let variaty=JSON.stringify(fields.encyc1[0]).replace(/\\r\\n/gm,"<br/>");
    let form=JSON.stringify(fields.encyc2[0]).replace(/\\r\\n/gm,"<br/>");
    let character=JSON.stringify(fields.encyc3[0]).replace(/\\r\\n/gm,"<br/>");
    let nurse=JSON.stringify(fields.encyc4[0]).replace(/\\r\\n/gm,"<br/>");
    let feed=JSON.stringify(fields.encyc5[0]).replace(/\\r\\n/gm,"<br/>");
        DB.add('encyclopediaInfo', {
          classid,
          variaty,
          form,
          character,
          nurse,
          feed
        }, err=>{
          if (err) {
            res.send('添加百科数据失败'+err)
          } else {
            res.redirect('/encyclopedia/add')
          }
        });
    });
});

router.get('/do_del',(req,res)=>{
    let classid=req.query.id
    DB.del('encyclopediaInfo',{
        "classid":classid
    },err=>{
        if(err){
            res.send('删除百科数据失败'+err)
        }
        res.redirect('/encyclopedia')
    })
})
module.exports=router;