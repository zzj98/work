//1.导入http模块
var http = require('http');
//导入文件模块
var fs = require('fs');
//导入路径模块
var path = require('path');
//导入url模块
var url = require('url');
var querystring = require("querystring");

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
            console.log("aaa");
            if (pathname === "/get"){
                // console.log(name);
                name = request.query.name;
                response.writeHead(200, {'Content-Type': 'text/plain'});
                fs.readFile('./index/result.html', 'utf-8', function (err,data) {
                    console.log(data);
                    data = data.replace('{{**name**}}',name);
                    response.end(data);
                });
                // console.log(name);
                // response.end(name);
            }else if(pathname === "/post"){
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                // response.write(postHTML);
                response.end(html);
            }else if(pathname === "/index/submit"){
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
                fs.readFile('./index/submit.html', 'utf-8', function (err,data) {
                    console.log(data);
                    response.end(data);
                });
            }
            break;
        case "POST":
            console.log("bbb");
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

}).listen(8001);
console.log('Server running at http://zzj19980514.xyz:8001/');