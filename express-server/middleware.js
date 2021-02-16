/*
*对于中间件函数：
  中间件函数可以执行以下任务：
    执行任何代码。
    对请求和响应对象进行更改。
    结束请求/响应循环。
    调用堆栈中的下一个中间件函数。
  如果当前中间件函数没有结束请求/响应循环，那么它必须调用 next()，以将控制权传递给下一个中间件函数。否则，请求将保持挂起状态。

  请注意对 next() 的调用。调用此函数时，将调用应用程序中的下一个中间件函数。 next() 函数不是 Node.js 或 Express API 的一部分，而是传递给中间件函数的第三自变量。next() 函数可以命名为任何名称，但是按约定，始终命名为“next”。为了避免混淆，请始终使用此约定。
*/

/*
*Express 应用程序可以使用以下类型的中间件：
  应用层中间件
  路由器层中间件
  错误处理中间件
  内置中间件
  第三方中间件
*/

// -------------------------------------------------------------------------------------------------------------

// 要装入中间件函数，请调用 app.use() 并指定中间件函数。 例如，以下代码在根路径 (/) 的路由之前装入 myLogger 中间件函数。
var express = require('express');
var app = express();

var myLogger = function (req, res, next) {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
// 应用程序每次收到请求时，会在终端上显示消息“LOGGED”。
// 中间件装入顺序很重要：首先装入的中间件函数也首先被执行。
// 中间件函数 myLogger 只是显示消息，然后通过调用 next() 函数将请求传递到堆栈中的下一个中间件函数。

// -------------------------------------------------------------------------------------------------------------

// 下一个示例将名为 requestTime 的属性添加到请求对象。我们将此中间件函数命名为“requestTime”。
var express = require('express');
var app = express();

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});

app.listen(3000);
// 您向应用程序根发出请求时，此应用程序当前在浏览器中显示请求的时间戳记。
// 因为您拥有请求对象、响应对象、堆栈中的下一个中间件函数以及整个 Node.js API 的访问权，所以中间件函数的可能性是无穷的。
// 下一个中间件函数通常由名为 next 的变量来表示。

// -------------------------------------------------------------------------------------------------------------

// 此示例显示没有安装路径的中间件函数。应用程序每次收到请求时执行该函数。
var app = express();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 此示例显示安装在 /user/:id 路径中的中间件函数。在 /user/:id 路径中为任何类型的 HTTP 请求执行此函数。
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 此示例显示一个路由及其处理程序函数（中间件系统）。此函数处理针对 /user/:id 路径的 GET 请求。
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id);
  next();
}, function (req, res, next) {
  res.send('User Info');
});

// -------------------------------------------------------------------------------------------------------------

// 要跳过路由器中间件堆栈中剩余的中间件函数，请调用 next('route') 将控制权传递给下一个路由。 
// 注：next('route') 仅在使用 app.METHOD() 或 router.METHOD() 函数装入的中间件函数中有效。

// 此示例显示一个中间件子堆栈，用于处理针对 /user/:id 路径的 GET 请求。
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id == 0) next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next(); //
}, function (req, res, next) {
  // render a regular page
  res.render('regular');
});
// 一旦上面的 req.params.id == 0，程序就会跳到这里来执行！
// 说明：程序在上面已经匹配了一次 /user/:id get请求，但由于没有终止响应，
// 所以当req.params.id == 0时程序跳出来在这里执行的时侯仍会再匹配这里的 /user/:id get请求。
// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special');
});
