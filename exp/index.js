//express_demo.js 文件
var express = require('express');
var url = require('url');
var app = express();
var db = require("./config/db");
var Cookies = require('cookies');
var text;
// var fs = require('fs');

app.use('/static', express.static('index'));
//设置模板引擎为ejs
app.set('view engine', 'ejs'); //app = express() ;
app.set('views', __dirname + '/views');

//cookies进行签名(加密)
var keys = ['keyboard cat'];

//获取表单信息
app.get("/submit", function (req,res) {
    db.query('SELECT * FROM user', function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        text = result;
        console.log(text);
        res.json(result);
    });
});

/**
 * 添加用户
 */
app.get("/add", function (req, res) {
    // res.render("add");
    var parseObj = url.parse(req.url, true);
    req.query = parseObj.query;
    // console.log(res);
    var results = "'" + req.query.Username + "'" + "," + "'" + req.query.Password + "'" + "," + "'" + req.query.Name + "'" + "," + "'" + req.query.Gender + "'" + "," + "'" + req.query.Professional + "'" ;
    var sql = "INSERT INTO user(`Username`,`Password`, `Name`,`Sex`,`Professional`) VALUES ( "+ results + ")";
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("新增失败" + err);
        } else {
            console.log(sql);
            res.render("submit");
        }
    });
});
// app.post("/add", function (req, res) {
//     // var name = req.body.name;
//     // var age = req.body.age;
//
//
// });

/**
 * 删除用户
 */
app.get("/del/:id", function (req, res) {
    var id = req.params.id;
    db.query("delete from user where id = " + id, function (err, rows) {
        if (err) {
            res.send("删除失败" + err);
        } else {
            console.log(rows);
            res.render('submit');
            // res.render("submit");
        }
    });
});

/**
 * 修改
 */
app.get("/toUpdate/:id", function (req, res) {
    var id = req.params.id;
    var sql = "select * from user where id = " + id;
    // console.log(sql);
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("修改页面跳转失败");
        } else {
            res.render("updata", {
                id: rows[0].id,
                Username: rows[0].Username,
                Password: rows[0].Password,
                Name: rows[0].Name,
                Gender: rows[0].Sex,
                Professional: rows[0].Professional,
            });
        }
    });
});

app.get("/update", function (req, res) {
    var parseObj = url.parse(req.url, true);
    req.query = parseObj.query;
    var results = "Username = '" + req.query.Username + "'" + "," + " Password = '" + req.query.Password + "'" + "," + " Name = '" + req.query.Name + "'" + "," + " Sex = '" + req.query.Gender + "'" + "," + " Professional = '" + req.query.Professional + "'" ;
    var sql = "update user set " + results + " where Username = '" +  req.query.Username + " '";
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("修改失败 " + err);
        } else {
            res.render("submit");
        }
    });
});


/**
 * 查询
 */
app.get("/search", function (req,res) {
    var parseObj = url.parse(req.url, true);
    var cookies = new Cookies(req, res, { keys: keys });
    var keep = 60000*3;
    var flag = false;
    var time;
    var cook;
    req.query = parseObj.query;
    var sql  = "SELECT * FROM user where Username = '" + req.query.name + " '";
    db.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        console.log("-----------------");
        console.log(result[0]);
        // res.json(result[0]);
        if (req.query.name === result[0].Username && req.query.pwd == result[0].Password) {
            time = Math.round(new Date() / 1000) + keep / 1000;
            cook =  Math.floor(Math.random () * 900) + 100;
            cookies.set('cookie',cook,{maxAge:keep});
            // console.log("time:"+time+"&& cook:"+cook);
            res.render('index', {
                id: result[0].id,
                username: result[0].Username,
                pwd: result[0].Password,
                name: result[0].Name,
                gender: result[0].Sex,
                professional: result[0].Professional,
            });
        //     res.end();
        //     flag = true;
        }
        if (flag == false) {
            console.log('404 THIS IS A ERR!');
            res.end();
        }
        if(result[0].Cookie==null){
            var results = "Cookie = '" + cook + "'" + "," + " Keep = '" + time + " '";
            var sql = "update user set " + results + " where Username = '" +  req.query.name + " '";
            db.query(sql, function (err, rows) {
                console.log(sql);
                console.log("Cookie添加成功！！！")
            });
        }
    });
});

module.exports = db;

// app.get('/get', function (req, res) {
//     var parseObj = url.parse(req.url, true);
//     var cookies = new Cookies(req, res, { keys: keys });
//     var flag = false;
//     var time;
//     var cook;
//     req.query = parseObj.query;
//     // res.send('Hello World');
//     // text = require('./index/text');//要获取的json文件
//     for (var i = 0; i < text.length; i++) {
//         console.log(text[i]);
//         var keep = 60000*3;
//         if (req.query.name === text[i].Username && req.query.pwd == text[i].Password) {
//             time = Math.round(new Date() / 1000) + keep / 1000;
//             cook =  Math.floor(Math.random () * 900) + 100;
//             cookies.set('cookie',cook,{maxAge:keep});
//             // console.log("time:"+time+"&& cook:"+cook);
//             res.render('index', {
//                 id: text[i].id,
//                 username: text[i].Username,
//                 pwd: text[i].Password,
//                 name: text[i].Name,
//                 gender: text[i].Sex,
//                 professional: text[i].Professional,
//             });
//             res.end();
//             flag = true;
//         }
//     }
//     if(req.query.name==""){
//         var results = "Cookie = '" + cook + "'" + "," + " Keep = '" + time + " '";
//         var sql = "update user set " + results + " where Username = '" +  req.query.name + " '";
//         db.query(sql, function (err, rows) {
//             console.log(sql);
//             console.log("Cookie添加成功！！！")
//         });
//     }
//     if (flag == false) {
//         res.send('404 THIS IS A ERR!')
//     }
// });

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

// db.end();

app.listen(8081, function () {
    console.log("load http://127.0.0.1:8081");
    console.log("load http://http://zzj19980514.xyz:8081");
});