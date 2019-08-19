var https = require("https");
var iconv = require('iconv-lite');


var url = "https://tieba.baidu.com/p/6225943247";
//https://tieba.baidu.com/p/6225943247
var UserAgent = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36';
//    "Cookie":"bid=rPVSjRybJ-M; douban-fav-remind=1; ll=\"108289\"; __utma=30149280.2020771368.1564302800.1564459924.1566095954.3; __utmc=30149280; __utmz=30149280.1566095954.3.3.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmb=30149280.2.10.1566095954; ap_v=0,6.0; _pk_ref.100001.4cf6=%5B%22%22%2C%22%22%2C1566097636%2C%22https%3A%2F%2Fwww.douban.com%2F%22%5D; _pk_ses.100001.4cf6=*; __utma=223695111.537904115.1564302800.1564302800.1566097636.2; __utmb=223695111.0.10.1566097636; __utmc=223695111; __utmz=223695111.1566097636.2.2.utmcsr=douban.com|utmccn=(referral)|utmcmd=referral|utmcct=/; _vwo_uuid_v2=D0FC47CC93789BD9FE21EF972E815331C|68a9006f122755131f7a79b02c4e80af; _pk_id.100001.4cf6=0baf9c4df508ab6f.1564302800.2.1566097656.1564302807.\n",
var option = {
    hostname:'www.baidu.com',
    // path:'/review/best/',
    headers: {
        // "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
        // "Cache-Control": "max-age=0",
        // "Accept-Language": "zh,zh-CN;q=0.9,en;q=0.8",
        // "Host": "www.baidu.com",
        // "Cookie": "BAIDUID=3141D8BB2EB1B79D01273E143357C443:FG=1; BIDUPSID=3141D8BB2EB1B79D01273E143357C443; PSTM=1562572752; BD_UPN=12314353; ispeed=1; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; ispeed_lsm=3; BDUSS=lJEZnpSRTJ4amt0NldMZHpXdXhjQ0xEQVNPekJiVEdnQUZ4aVFDU3VyNW1lWUJkRUFBQUFBJCQAAAAAAAAAAAEAAAC5dmk1SUlJgtxJSUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGbsWF1m7Fhdd; BD_HOME=1; delPer=0; BD_CK_SAM=1; PSINO=2; H_PS_PSSID=1459_21112_29523_29518_29098_29567_28833_29220_28702; H_PS_645EC=1332Sd7wOFun8yGlECSgel99g1fJjTysvKnq21ztzUyhoHGY0iY%2BU2sKGGE; BDSVRTM=144",
        // "Accept-Encoding": "utf-8",
        // "Accept-Encoding": "gzip, deflate, br",
        // "Connection": "keep-alive",
        // 'Charset': 'utf-8',
        "Cookie": "BDUSS=lJEZnpSRTJ4amt0NldMZHpXdXhjQ0xEQVNPekJiVEdnQUZ4aVFDU3VyNW1lWUJkRUFBQUFBJCQAAAAAAAAAAAEAAAC5dmk1SUlJgtxJSUkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGbsWF1m7Fhdd; BD_HOME=1; delPer=0; BD_CK_SAM=1; PSINO=2; H_PS_PSSID=1459_21112_29523_29518_29098_29567_28833_29220_28702; H_PS_645EC=1332Sd7wOFun8yGlECSgel99g1fJjTysvKnq21ztzUyhoHGY0iY%2BU2sKGGE; BDSVRTM=144",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
    }
};
var data = "";

// 创建一个请求
var req = https.request(option, function(res){
    // 设置显示编码
    // res.setEncoding("utf-8");
    // 数据是 chunked 发送，意思就是一段一段发送过来的
    // 我们使用 data 给他们串接起来
    var length=0;
    var arr=[];

    res.on('data', function(chunk){
        // data += chunk;
        arr.push(chunk);
        length+=chunk.length;
    });
    // 响应完毕时间出发，输出 data
    res.on('end', function(){
        // dealData(data);
        var data=Buffer.concat(arr,length);
        var change_data = iconv.decode(data,'utf-8');

        console.log(change_data);
        // console.log(data.toString());
    });
});

// 发送请求
req.end();