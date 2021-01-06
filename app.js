// ファイル入出力
var fs = require('fs');

// テンプレート
var ejs = require('ejs');
var template = fs.readFileSync('./views/index.ejs', 'utf8');

// express
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

// mathjax
var mjAPI = require("mathjax-node");

var title = "TeX SVG Convertor"
var def_mstr="E = mc^2"
var math_str = def_mstr
var buf = ejs.render(template, {
  title: title,
  math_str: math_str
});


mjAPI.config({
    MathJax: {
      // traditional MathJax configuration
    }
  });
mjAPI.start();

app.get('/', function(req, res) {
    math_str =def_mstr
    buf = ejs.render(template, {
        title: title,
        math_str: math_str
    });
    mjAPI.typeset({
        math: math_str,
        format: "TeX", // "inline-TeX", "MathML"
        svg: true,
        width: 40
      }, function (data) {
        if (!data.errors) {
            fs.writeFileSync("public/math.svg", data.svg); // ファイル出力
        }
    });
    res.send(buf);
});

app.post('/', function(req, res) {
    for (key in req.body) {
        console.log(key, '=', req.body[key]);
      }
    math_str=req.body["math_str"]
    buf = ejs.render(template, {
        title: title,
        math_str: math_str
    });
    mjAPI.typeset({
        math: math_str,
        format: "TeX", // "inline-TeX", "MathML"
        svg: true,
        width: 40
      }, function (data) {
        if (!data.errors) {
            console.log(data.svg); // 標準出力
            fs.writeFileSync("public/math.svg", data.svg); // ファイル出力
        }
    });
    res.send(buf);
});

app.listen(8080);