// express.Router
// 使用 express.Router 类来创建可安装的模块化路由处理程序。Router 实例是完整的中间件和路由系统；因此，常常将其称为“微型应用程序”。

// 以下示例将路由器创建为模块，在其中装入中间件，定义一些路由，然后安装在主应用程序的路径中。

// 在应用程序目录中创建名为 birds.js 的路由器文件，其中包含以下内容：
var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route
router.get('/', function(req, res) {
  res.send('Mine home page');
});
// define the about route
router.get('/about', function(req, res) {
  res.send('About Mine');
});

module.exports = router;

// 接着，在应用程序中装入路由器模块：
// 注意，不是在这个文件中安装路由模块，对于这个程序而言，是在index.js中去安装router-mine.js：
// var mine = require('./router-mine');
// app.use('/mine', mine);
// 现在此程序就可处理针对 /birds 和 /birds/about 的请求了，并会调用特定于此路由的 timeLog 中间件函数。