var mysql = require("mysql");
var pool = mysql.createPool({
    host:'47.103.18.142',
    port:'3306',
    user:'root',
    password:'TjzzhuzhijiE1998',
    database:'exp'
});

function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows);
            connection.release();
        });
    });
}

exports.query = query;