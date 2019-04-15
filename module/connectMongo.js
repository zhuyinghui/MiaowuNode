var MongoClient=require('mongodb').MongoClient;
var api='mongodb://127.0.0.1:27017/mao';
//获取数据库的objectid
var ObjectId=require('mongodb').ObjectID;
exports.ObjectId=ObjectId;
function connectMongo(callback){
  MongoClient.connect(api,function (err,db) {
    const mydb = db.db('mao');
    if(err){
      console.log('连接数据库失败。')
    }else{
      callback(mydb); //若connectMongo被调用，则返回mydb
      db.close()
    }
  });
}
//参数：表名，查询条件json格式，回调函数
exports.find=function (collectionname,condition,callback) {
  connectMongo(function (db) {
    var result=db.collection(collectionname).find(condition);
    result.toArray(function (err,data) {
      callback(err,data) //返回err,data给find
      // client.close()
    })
  })
};
//参数：表名，要插入的数据json格式，回调函数
exports.add=function (collectionname,data,callback){
  connectMongo(function (db) {
    db.collection(collectionname).insertOne(data,function (err) {
      if(err){
        console.log('插入数据失败'+err)
      }else{
        console.log('插入数据成功');
        callback(err)
      }
    })
  })
};
//参数：表名，删除条件json格式，回调函数
exports.del=function (collectionname,condition,callback){
  connectMongo(function (db) {
    db.collection(collectionname).deleteOne(condition,function (err) {
      if(err){
        console.log('删除数据失败'+err)
      }else{
        console.log('删除数据成功');
        callback(err)
      }
    })
  })
};
//更新表，参数：表名，更新的条件，更新的数据，回调函数
//updateStr={$set:{"username":"zzz"}}
exports.update=(collectionname,condition,updateStr,callback)=>{
  connectMongo((db=>{
    db.collection(collectionname).updateOne(condition,updateStr,(err)=>{
      if(err){
        console.log('更新数据失败'+err)
      }else{
        console.log('更新数据成功')
        callback(err)
      }
    })
  }))
}
