/**
 * Created by wusicheng on 2016/12/15.
 */
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var mkdirp = require('mkdirp');
var http= require("http");

//目标网址
var url ='http://jandan.net/ooxx';

//本地存储目录
var dir = './images';

//创建目录
mkdirp(dir, function(err) {
    if(err){
        console.log(err);
    }
});
//发送请求
request(url, function(error, response, body) {
    if(!error && response.statusCode == 200) {

        var $ = cheerio.load(body);
        console.log(1)
//找到img所在标签目录
        var images = $('.text p');
        console.log(images)
        console.log(2)
        images.each(function(item) {
// 通过标签名找到img
            console.log(3)
            var img = $(this).find('img')

            var src = img.attr('src') + "";
            console.log(src);
            console.log('正在下载' + src);
            download(src, dir, Math.floor(Math.random()*100000) + src.substr(-4,4));
            console.log('下载完成');
        });
    }
});
//下载方法
var download = function(url, dir, filename){
    request.head(url, function(err, res, body){
        request(url).pipe(fs.createWriteStream(dir + "/" + filename));
    });
};
