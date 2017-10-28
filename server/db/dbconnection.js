/**
 * Created by awedag on 27.10.17.
 */
var mysql=require('mysql');
var connection=mysql.createPool({
    host     : 'localhost',
    user     : 'school',
    password : 'school',
    database : 'school_test'

});
module.exports=connection;