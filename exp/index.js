//express_demo.js 文件
var express = require('express');
var url = require('url');
var app = express();
var fs = require('fs');
var text;
var db = require("./config/db");

app.use('/static', express.static('index'));
//设置模板引擎为ejs
app.set('view engine', 'ejs'); //app = express() ;
app.set('views', __dirname + '/views');

app.get("/submit", function (req,res) {
    db.query('SELECT * FROM user', function (err, result) {
        if (err) {
            console.log('[SELECT ERROR]:', err.message);
        }
        text = result;
        console.log(text);
    });
    return text;
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
app.post("/add", function (req, res) {
    // var name = req.body.name;
    // var age = req.body.age;


});

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
    console.log(sql);
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
    var id = req.query.id;
    var sql = "update user set " + results + " where id = " + id;
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
app.post("/search", function (req, res) {
    var name = req.body.s_name;
    var age = req.body.s_age;
    var sql = "select * from user";
    if (name) {
        sql += " where name = '" + name + "'";
    }
    //if(age){
    //    sql += " and age = '" + age + "'";
    //}

    sql.replace("and", "where");
    db.query(sql, function (err, rows) {
        if (err) {
            res.send("查询失败: " + err);
        } else {
            res.render("users", {title: "用户列表", datas: rows, s_name: name, s_age: age});
        }
    });
});

module.exports = db;

app.get('/get', function (req, res) {
    var parseObj = url.parse(req.url, true);
    var flag = false;
    req.query = parseObj.query;
    // res.send('Hello World');
    // text = require('./index/text');//要获取的json文件
    for (var i = 0; i < text.length; i++) {
        console.log(text[i]);
        if (req.query.name === text[i].Username && req.query.pwd == text[i].Password) {
            res.render('index', {
                id: text[i].id,
                username: text[i].Username,
                pwd: text[i].Password,
                name: text[i].Name,
                gender: text[i].Sex,
                professional: text[i].Professional,
            });
            res.end();
            flag = true;
        }
    }
    if (flag == false) {
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

// db.end();

app.listen(8081, function () {
    console.log("load http://127.0.0.1:8081");
});