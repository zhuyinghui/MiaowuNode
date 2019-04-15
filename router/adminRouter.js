var express=require('express');
var router=express.Router();

//打开数据库 mongod --dbpath D:\MongoDB  连接数据库 D:\MongoDB>mongo
//数据库名mao 表名adminLogin, goodsClass, goodsInfo, userLogin

//首页
router.get('/',function (req,res) {
  res.render('adminindex')
});

//登录
var adminLogin=require('./adminRouter/adminLogin');
router.use('/adminLogin',adminLogin);

//注册
// var adminRegister=require('./adminRouter/adminRegister');
// router.use('/adminRegister',adminRegister);

//添加商品
var goodsAdd=require('./adminRouter/goodsAdd');
router.use('/goodsAdd',goodsAdd);

//显示商品列表，删除商品
var goodsList=require('./adminRouter/goodsList');
router.use('/goodsList',goodsList);

// //添加分类
var classAdd=require('./adminRouter/classAdd');
router.use('/classAdd',classAdd);

// //显示商品分类列表，删除分类
var goodsClass=require('./adminRouter/goodsClass');
router.use('/goodsClass',goodsClass);

module.exports=router;
