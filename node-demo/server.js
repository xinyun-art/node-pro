const http = require('http')
const fs = require('fs')
const path = require('path')
const url = require('url')
const template = require('art-template')

const server = http.createServer()

server.on('request', (req, res) => {
  let reqUrl = req.url
  const extName = path.extname(reqUrl)
  console.log('req-url:', reqUrl)
  console.log('extName:', extName)

  const pathname = url.parse(reqUrl).pathname

  if (reqUrl === '/') reqUrl = '/public/index.html'
  if (reqUrl === '/favicon.ico') reqUrl = '/public/favicon.ico'

  //如果请求路径是以/public/开头，则表示是要获取public文件夹中的公共资源，则直接从public中读取文件
  //注意：我们只暴露出了public文件夹，因此只有public中的公共资源可以被访问
  if (reqUrl.indexOf('/public/') === 0) {
    fs.readFile(__dirname + reqUrl, (err, data) => {
      if (err !== null) {
        console.error(err)
        res.writeHead(404, { 'Content-type': 'text/plain;charset=utf-8' })
        res.write('资源不存在！！！-- FILE NOT FOUND!!!')
        res.end()
        return
        // throw new Error("file not exist");此种抛出错误的方式会直接让程序退出
      }
      if (extName === '.txt') {
        res.setHeader('Content-type', 'text/plain;charset=utf-8')
      }
      if (extName === '.html') {
        res.setHeader('Content-type', 'text/html;charset=utf-8')
      }
      if (extName === '.css') {
        res.setHeader('Content-type', 'text/css;charset=utf-8')
      }
      if (extName === '.js') {
        res.setHeader('Content-type', 'text/javascript;charset=utf-8')
      }
      if (extName === '.json') {
        res.setHeader('Content-type', 'application/json')
      }
      // 简单的插值替换，未使用模板引擎
      if (reqUrl === '/public/index.html') {
        const templateDate = {
          introduction: '这是一场关于勇气的冒险之旅',
          think: '如果你考虑好了',
          start: '就从这里开始你的冒险吧\\^_^/',
          next: '你做好准备前往下一目的地了吗？',
          back: '返回一切的开始',
        }
        // let indexStr = "";
        // indexStr = data.toString().replace("{{start}}","就从这里开始你的冒险吧\\^_^/")
        // indexStr = indexStr.replace("{{next}}","你做好准备前往下一目的地了吗？")
        // console.log("index-Str:",indexStr);
        let idxStr = data.toString()
        for (key in templateDate) {
          const dataKey = new RegExp('{{' + key + '}}', 'g')
          idxStr = idxStr.replace(dataKey, templateDate[key])
        }
        res.end(idxStr)
        return
      }
      //使用art-template模板引擎
      if (reqUrl === '/public/art-template.html') {
        const templateHtml = template.render(data.toString(), {
          intro: '这里是art-template',
          start: '开始这一场冒险之旅吧！',
          linkTo: '前往art-template官网',
          open: false,
          options: [
            {
              name: 'ejs',
              url: 'https://ejs.bootcss.com/',
            },
            {
              name: 'pug',
              url: 'https://pugjs.org/zh-cn/api/getting-started.html',
            },
            {
              name: 'Handlebars',
              url: 'https://handlebarsjs.com/zh/',
            },
          ],
          html: '<h3>我是h3</h3>',
          path: path.join(__dirname, 'public'),
        })
        console.log('templateHtml:', templateHtml)
        res.end(templateHtml)
        return
      }
      res.write(data)
      res.end()
    })
  } else if (pathname === '/edit') {
    fs.readFile(__dirname + '/views/edit.html', (err, data) => {
      if (err !== null) {
        res.end('文件不存在！')
        return
      }
      res.end(data)
    })
  } else if (pathname === '/redirect') {
    // 如何通过服务端让客户端重定向
    // 1.状态设置成302--临时重定向（301为永久重定向）
    // 2.在响应头中通过设置Location告诉客户端跳转到哪里--res.setHeader("Location","重定向的地址")
    // 3.如果客户端收到服务器返回的状态码为302，就会自动到响应头中去找Location进行重定向
    // 4.所以你就能看到客户端自动跳转了
    setTimeout(() => {
      // res.statusCode = 302;
      // res.setHeader("Location", "/");
      // 简便写法
      res.writeHead(302, { Location: '/' })
      res.end()
    }, 3000)
  } else {
    fs.readFile(__dirname + '/views/404.html', (err, data) => {
      if (err !== null) {
        res.end('404 NOT FOUND!')
        return
      }
      console.log('data:', data)
      res.statusCode = 404
      res.end(data)
    })
  }

  // 也可直接采用这种读流方法读取文件。
  // readFile() 读取文件的全部内容，并在完成时调用回调函数。
  // 回调中的 res.end(data) 会返回文件的内容给 HTTP 客户端。
  // 如果文件很大，则该操作会花费较多的时间。
  // 而createReadStream()当要发送的数据块已获得时就立即开始将其流式传输到 HTTP 客户端，而不是等待直到文件被完全读取。
  // const stream = fs.createReadStream(__dirname + reqUrl );
  // stream.pipe(res);
})

server.listen(3000, () => {
  console.log('服务器正运行在127.0.0.1:3000上...')
})
