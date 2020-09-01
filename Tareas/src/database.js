const mysql=require('mysql');


const mysqlConection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'root',
    database:'tests'
});

mysqlConection.connect(function(err){
    if(err){
        console.log(err);
        return
    }else{
        console.log('Db conectada');
    }
});
module.exports=mysqlConection;