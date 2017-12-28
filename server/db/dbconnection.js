"use strict";

var mysql=require('mysql');

var connection=mysql.createPool({
    host     : '127.0.0.1',
    port     :  '3306',
    user     : 'school',
    password : 'school',
    database : 'school_test'

});
module.exports=connection;
