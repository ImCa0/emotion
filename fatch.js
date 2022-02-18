import fs from "fs";
import http from "http";

// @ts-ignore
let emote = JSON.parse(fs.readFileSync("./web.json"));

let packages = emote.data.packages;

let pkg = packages[0].emote;

pkg.forEach((element) => {
  let url = element.url;
  // 用http的get方法来发送请求
  http
    .get(url, (response) => {
      //data 存储图片数据，是二进制流
      var data = "";
      // 一定要设置encode，否则即使在pic/downImg/中有1.jpg,也是无法显示的
      response.setEncoding("binary");
      // 当数据到达时会触发data事件
      response.on("data", function (chunk) {
        data += chunk;
      });
      // 当数据接收完毕之后，会触发end事件
      response.on("end", function () {
        //写入文件
        fs.writeFile("./bilibili/" + url.split("/")[5] + ".png", data, "binary", (err) => {
          if (err) {
            console.log("写入文件错误");
          } else {
            console.log("写入文件成功");
          }
        });
      });
    })
    .on("error", function () {
      console.log("读取错误");
    });
});
