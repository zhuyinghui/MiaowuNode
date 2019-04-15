
let express=require('express');
let app=express();
app.set('view engine','ejs');

let cors = require('cors')
app.use(cors())

//设置后台系统静态文件加载根目录
app.use(express.static('static'));
app.use(express.static('static/upload'));

//获取表单提交的数据
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//后台系统的路由
let adminRouter=require('./router/adminRouter');
app.use('/',adminRouter);

//接口
let api=require('./api/api');
app.use('/api',api);



// app.all('*', function(req, res, next) {
//     console.log(req.method);
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Headers', 'Content-type');
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
//     res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
//     next();  
// });

app.listen(80);