const express = require('express');
var app = express();

app.use('/static', express.static('index'));

app.get('/test', (req, res, next) => {
    let mysql  = require('mysql');
    let connection = mysql.createConnection({
        host:'47.103.18.142',
        port:'3306',
        user:'root',
        password:'TjzzhuzhijiE1998',
        database:'exp'
    });
    let  sql = 'SELECT * FROM user'; // 查询语句
    connection.query(sql,function (err, result) {
        res.json(result);
    });
});

app.listen(8081, function () {
    console.log("load http://127.0.0.1:8081");
});