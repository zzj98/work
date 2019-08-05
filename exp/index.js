//express_demo.js 文件
var express = require('express');
var url = require('url');
var app = express();

app.use('/static', express.static('index'));

//设置模板引擎为ejs
app.set('view engine','ejs') ; //app = express() ;
app.set('views', __dirname + '/views') ;

// app.get('/',function(req,res) {
//     res.render('index',{
//         name:'ejs case'
//     }) ;
// }) ;

app.get('/get', function (req, res) {
    var parseObj = url.parse(req.url, true);
    var flag = false;
    req.query = parseObj.query;
    // res.send('Hello World');
    var text = require('./index/text');//要获取的json文件
    for (var i = 0 ; i<text.aaa.length ; i++){
        if (req.query.name === text.aaa[i].username && req.query.pwd == text.aaa[i].pwd){
            res.render('index',{
                username:text.aaa[i].username,
                pwd:text.aaa[i].pwd,
                name:text.aaa[i].name,
                gender:text.aaa[i].gender,
                professional:text.aaa[i].professional,
            }) ;
            flag = true;
        }
    }
    if (flag == false){
        res.send('404 THIS IS A ERR!')
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


app.listen(8081, function () {
    console.log("应用实例，访问地址为 http://127.0.0.1:8081")

});