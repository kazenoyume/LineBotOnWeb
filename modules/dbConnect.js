var mySql=require('mysql');

var connection=mySql.createConnection({
    host:'10.9.192.106',
    user: 'admin',
    password: 'topmso',
    database: 'MOBILE'
});

module.exports=connection;