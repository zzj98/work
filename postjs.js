/*
//1.导入http模块
var http = require('http');
//导入文件模块
var fs = require('fs');
//导入路径模块
var path = require('path');
//导入querystring模块（解析post请求数据）
var querystring = require('querystring');

//2.创建服务器
function handle_request(req,res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
}
var app = http.createServer(handle_request);

//3.添加响应事件
app.on('request', function (req, res) {

    console.log(req.method);

    //1.通过判断url路径和请求方式来判断是否是表单提交
    if (req.url === '/heroAdd' && req.method === 'POST') {
        /!**服务端接收post请求参数的流程
         * （1）给req请求注册接收数据data事件（该方法会执行多次，需要我们手动累加二进制数据）
         *      * 如果表单数据量越多，则发送的次数越多，如果比较少，可能一次就发过来了
         *      * 所以接收表单数据的时候，需要通过监听 req 对象的 data 事件来取数据
         *      * 也就是说，每当收到一段表单提交过来的数据，req 的 data 事件就会被触发一次，同时通过回调函数可以拿到该 段 的数据
         * （2）给req请求注册完成接收数据end事件（所有数据接收完成会执行一次该方法）
         *!/
        //创建空字符叠加数据片段
        var data = '';

        //2.注册data事件接收数据（每当收到一段表单提交的数据，该方法会执行一次）
        req.on('data', function (chunk) {
            // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
            data += chunk;
        });

        // 3.当接收表单提交的数据完毕之后，就可以进一步处理了
        //注册end事件，所有数据接收完成会执行一次该方法
        req.on('end', function () {

            //（1）.对url进行解码（url会对中文进行编码）
            data = decodeURI(data);
            console.log(data);

            /!**post请求参数不能使用url模块解析，因为他不是一个url，而是一个请求体对象 *!/

                //（2）.使用querystring对url进行反序列化（解析url将&和=拆分成键值对），得到一个对象
                //querystring是nodejs内置的一个专用于处理url的模块，API只有四个，详情见nodejs官方文档
            var dataObject = querystring.parse(data);
            console.log(dataObject);
        });
    }else if (req.url === '/index' && req.method === 'POST') {
        fs.readFile('./index/post.html', function (err, data) {
            if (err) {
                throw err;
            }
            res.end(data);
        });
    } else if (req.url.indexOf('/node_modules') === 0) {
        fs.readFile(__dirname + req.url, function (err, data) {
            if (err) {
                throw err;
            } else {
                res.end(data);
            }
        });
    } else {
        res.end('请求路径： ' + req.url);
    }
});

//4.监听端口号
app.listen(3000, function () {
    console.log('欢迎来到王者荣耀英雄管理器');
});*/
//1.导入http模块
var http = require('http');
//导入文件模块
var fs = require('fs');
//导入路径模块
var path = require('path');
//导入url模块
var url = require('url');
var querystring = require("querystring");

/*var postHTML =
    '<html><head><meta charset="utf-8"></head>' +
    '<body>' +'<h1>{{**name**}}</h1>'+
    '</body></html>';
var flag ;*/
var html;

http.createServer(function (request, response) {
    //1.默认情况下，如果url路径中有中文，则会对中文进行URI编码，所以服务端要想获取中文需要对url进行URI解码
    console.log(encodeURI(request.url));
    console.log(request.url);
    // 2.url.parse 方法可以将一个 URL 路径解析为一个方便操作的对象
    // 将第二个可选参数指定为 true， 表示将结果中的 query 解析为一个对象
    var parseObj = url.parse(request.url, true);
    console.log(parseObj);
    var pathname = parseObj.pathname; //相当于无参数的url路径
    console.log(pathname);
    // 这里将解析拿到的查询字符串对象作为一个属性挂载给 req 对象，这样的话在后续的代码中就可以直接通过 req.query 来获取查询字符串了
    request.query = parseObj.query;
    console.log(request.query);
    console.log("--------------------------");
    var name = "";
    // 处理接口
    switch (request.method) {
        case "GET":
            if (pathname === "/get"){
                name = request.query.name;
                response.writeHead(200, {'Content-Type': 'text/plain'});
                response.end(name);
            }else if(pathname === "/post"){
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                // response.write(postHTML);
                response.end(html);
            }
            break;
        case "POST":
            if (pathname === "/post"){
                var postData = "";
                // 数据块接收中
                request.on("data", function (postDataChunk) {
                    postData += postDataChunk;
                });

                request.on("end", function () {
                    console.log('数据接收完毕');
                    console.log(request.headers["content-type"]);
                    // console.log(request);
/*
                    if(request.headers["content-type"] === "application/x-www-form-urlencoded"){
                        console.log("aaa");
                        var params = querystring.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
                        console.log(params);
                        console.log(params["name"]);
                        name = params["name"]
                    }else if(request.headers["content-type"] === "application/json"){
                        console.log("bbb");
                        var params = JSON.parse(postData);//GET & POST  ////解释表单数据部分{name="zzl",email="zzl@sina.com"}
                        console.log(params);
                        console.log(params["name"]);
                        name = params["name"]
                    }
*/

                    postData= querystring.parse(postData);
                    // response.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
                    // response.write("======================================="+params["name"]+"~~"+params["password"]);
                    // response.write(util.inspect(params));
                    // response.end("数据提交完毕");
                    // response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                    response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});


                    if(postData.name) { // 输出提交的数据
                        fs.readFile('./index/template.html', 'utf-8', function (err,data) {
                            console.log(data);
                            html = data.replace('{{**name**}}',postData.name);
                            response.end(html);
                        });
                        /*
                            postHTML = postHTML.replace('{{**name**}}',postData.name);
                            postHTML = postHTML.replace(/noHTML/g,postData.name);
                            flag = postData.name;
                        */
                    } else if (postData.name === undefined) {  // 输出表单
                        fs.readFile('./index/template.html', 'utf-8', function (err,data) {
                            console.log(data);
                            html = data.replace('{{**name**}}','noHTML');
                            response.end(html);
                        });
                    }else {
                        fs.readFile('./index/template.html', 'utf-8', function (err,data) {
                            console.log(data);
                            html = data.replace('{{**name**}}','noHTML');
                            response.end(html);
                        });
                    }
                });
            }
            break;
    }

    // // console.log(request.url.indexOf("/api/who"))
    // // first url
    // if(request.url.indexOf("/api/who") != -1){
    //  if(request.method == "GET"){
    //
    //  }else if (request.method == "POST"){
    //
    //  }
    // }
    //
    // // second url
    // if(request.url.indexOf("/api/hellowho") != -1){
    //  if(request.method == "GET"){
    //
    //  }else if (request.method == "POST"){
    //
    //  }
    // }

    // console.log(request.url);
    // console.log(request.method);

}).listen(8888);
console.log('Server running at http://127.0.0.1:8888/');