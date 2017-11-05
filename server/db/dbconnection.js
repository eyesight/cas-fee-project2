/**
 * Created by awedag on 27.10.17.
 */

var mysql=require('mysql');

var connection=mysql.createPool({
    host     : '127.0.0.1',
    port     :  '8889',
    user     : 'school',
    password : 'school',
    database : 'school_test'

});
module.exports=connection;
