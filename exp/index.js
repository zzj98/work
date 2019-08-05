//express_demo.js 文件
var express = require('express');
var fs = require('fs');
var url = require('url');
var app = express();
var name = "";
var pwd = "";

//设置模板引擎为ejs
app.set('view engine','ejs') ; //app = express() ;
//设置模板文件位置 => 项目根路径下views目录为模板文件存放目录
app.set('views', __dirname + '/views') ;

app.get('/',function(req,res) {
    res.render('index',{
        name:'ejs case'
    }) ;
}) ;

app.get('/get', function (req, res) {
    var parseObj = url.parse(req.url, true);
    req.query = parseObj.query;
    // res.send('Hello World');
    name = req.query.name;
    pwd = req.query.pwd;
    if (name === "aaa" && pwd === "123"){
        fs.readFile('./index/result.html', 'utf-8', function (err, data) {
            console.log(data);
            data = data.replace('{{**name**}}', name);
            data = data.replace('{{**pwd**}}', pwd);
            res.end(data);
        });
    }else {
        res.send('404 THIS A ERR!')
    }
});

// app.get('/index/submit', function (req, res) {
//     var parseObj = url.parse(req.url, true);
//     req.query = parseObj.query;
//     // res.send('Hello World');
//     name = req.query.name;
//     fs.readFile('./index/submit.html', 'utf-8', function (err,data) {
//         console.log(data);
//         res.end(data);
//     });
// });

app.use('/static', express.static('index'));

app.listen(8081, function () {
    console.log("应用实例，访问地址为 http://127.0.0.1:8081")

});