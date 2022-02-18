import fs from "fs";

// @ts-ignore
let emote = JSON.parse(fs.readFileSync("./web.json"));

let packages = emote.data.packages;

let result = [];

let pkg = packages[0].emote;

pkg.forEach((element) => {
  let e = {};
  e.icon = '<img src="https://cdn.jsdelivr.net/gh/ImCa0/emotion/' + element.url.split('/')[5] + '">';
  e.text = element.text
  result.push(e)
});

fs.writeFileSync("./result.json", JSON.stringify(result), {flag:'a'});

console.log(result);
