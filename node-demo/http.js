const http = require("http");
const https = require("https");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  //设置状态码和消息
  // res.statusCode = 500
  // res.statusMessage = '内部服务器错误'

  //关于响应内容乱码问题
  //Node 服务端默认发送的数据编码是 utf-8 格式；
  //浏览器在不知道服务器响应内容编码的情况下,会使用当前操作系统的默认编码去解析；
  //中文操作系统默认的编码格式 gbk；
  //解决办法：如下1、2、3
  //1.设置 HTTP 消息头的值（每次只能设置单个）
  // res.setHeader("Content-type", "text/plain;charset=utf-8;");
  //2.允许您同时设置多个响应头（该方法接受 statusCode 作为第一个参数）
  res.writeHead(200, { "Content-type":"text/html;charset=utf-8;"});
  //3."Content-type"为"text/html时可用。
  // res.write('<head><meta charset="utf-8"/></head>');

  //若要在响应正文中发送数据给客户端，则使用 write()。 它会发送缓冲的数据到 HTTP 响应流。
  res.write("<p>这是第一段html</p>");
  res.write();
  res.end("<h4>恭喜你!The first request success!</h4>");
});

server.listen(port, hostname, () => {
  console.log(`服务器正运行在${hostname}:${port}上。。。`);
});