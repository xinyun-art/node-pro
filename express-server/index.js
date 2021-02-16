const express = require("express");

const app = express();

// 静态资源目录使用
app.use(express.static("public"));
// 要使用多个静态资源目录，请多次调用express.static()中间件函数
// Express 以您使用 express.static 中间件函数设置静态目录的顺序来查找文件。
app.use(express.static("files"));
// 要为 express.static 函数提供的文件创建虚拟路径前缀（路径并不实际存在于文件系统中），请为静态目录指定安装路径
// app.use('/static', express.static('public'));
// 现在，可以访问具有 /static 路径前缀的 public 目录中的文件。

// 然而，向express.static函数提供的路径相对于您在其中启动 node 进程的目录。如果从另一个目录运行 Express 应用程序，那么对于提供资源的目录使用绝对路径会更安全：
// app.use('/static', express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.send("欢迎来到express-art的主页");
});

app.post("/register", (req, res) => {
  res.send("register...");
});

// 多个回调函数可以处理一个路由（确保您指定 next 对象）。例如：
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});

// app.route()
// 您可以使用 app.route() 为路由路径创建可链接的路由处理程序。 因为在单一位置指定路径，所以可以减少冗余和输入错误。有关路由的更多信息，请参阅 Router() 文档。
// 以下是使用 app.route() 定义的链式路由处理程序的示例。
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

// 有一种特殊路由方法：app.all()，它并非派生自 HTTP 方法。该方法用于在所有请求方法的路径中装入中间件函数。
// 在以下示例中，无论您使用 GET、POST、PUT、DELETE 还是在 http 模块中支持的其他任何 HTTP 请求方法，都将为针对“/secret”的请求执行处理程序。
app.all('/secret', function (req, res, next) {
  console.log('Accessing the secret section ...');
  next(); // pass control to the next handler
});

// 如何设置错误处理程序？
// 错误处理中间件的定义方式与其他中间件基本相同，差别在于错误处理中间件有 四个 自变量而不是三个，专门具有特征符 (err, req, res, next)：
app.use(function(err, req, res, next) {
  console.error("err:", err.stack);
  res.status(500).send('Something broke!');
});

// 如何处理 404 响应？
// 在 Express 中，404 响应不是错误的结果，所以错误处理程序中间件不会将其捕获。
// 您需要做的只是在堆栈的最底部（在其他所有函数之下）添加一个中间件函数来处理 404 响应：
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.listen(3000, () => {
  console.log("服务器正运行在127.0.0.1:3000上...");
})
