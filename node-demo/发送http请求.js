const https = require('https');
// const http = require('http');
// HTTP和 HTTPS模块提供的大多数功能是相当有限的。
// 你需要以区块为单位接收响应数据，而不是只提供一个回调函数，以便在收到所有数据后就立即执行。如果它是JSON格式你还需要进行手动解析。尽管工作量不大，但是它仍然会带来一些不必要的操作。
// 另一个麻烦是， HTTP和 HTTPS协议分属两个模块，因此如果我们使用的API是通过 HTTPS协议进行通信，则需要 HTTPS模块。
// 如果你不想向代码库中添加太多的依赖项或希望使用其底层的功能, 那么可能需要花费更多的精力来获取所需的数据, 尽管如此，但是它仍然是一个很好的工具。

/** 方法一
//发送get请求
https.get('https://cat-fact.herokuapp.com/facts', (response) => {
  let data = '';

  // A chunk of data has been recieved.
  response.on('data', (chunk) => {
    data += chunk;
  });

  // The whole responseonse has been received. Print out the result.
  response.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});
*/

/**
 * 方法二--get请求
const options = {
  hostname: 'cat-fact.herokuapp.com',
  // port: 443,
  path: '/facts',
  method: 'GET'
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`);

  let data = "";

  res.on('data', chunk => {
    data += chunk;
  })

  res.on("end", () => {
    console.log(JSON.parse(data));
  })
})

req.on('error', error => {
  console.error(error);
})

req.end();
 */
/**
 * 方法二--post请求
const data = JSON.stringify({
  file: file
})

const options = {
  hostname: 'www.google.com',
  // port: 443,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}

const req = https.request(options, res => {
  console.log(`状态码: ${res.statusCode}`)

  res.on('data', chunk => {
    process.stdout.write(chunk)
  })
})

req.on('error', error => {
  console.error(error)
})

// write data to request body
req.write(data)
req.end()
 */
// PUT 和 DELETE 请求使用相同的 POST 请求格式，只需更改 options.method 的值即可。

/** 
// request() 解析
// http.request(options[, callback])
// request方法的options参数，可以是一个对象，也可以是一个字符串。
// 如果是字符串，就表示这是一个URL，Node内部就会自动调用url.parse()，处理这个参数。

options对象可以设置如下属性。

host：HTTP请求所发往的域名或者IP地址，默认是localhost。
hostname：该属性会被url.parse()解析，优先级高于host。
port：远程服务器的端口，默认是80。
localAddress：本地网络接口。
socketPath：Unix网络套接字，格式为host:port或者socketPath。
method：指定HTTP请求的方法，格式为字符串，默认为GET。
path：指定HTTP请求的路径，默认为根路径（/）。可以在这个属性里面，指定查询字符串，比如/index.html?page=12。如果这个属性里面包含非法字符（比如空格），就会抛出一个错误。
headers：一个对象，包含了HTTP请求的头信息。
auth：一个代表HTTP基本认证的字符串user:password。
agent：控制缓存行为，如果HTTP请求使用了agent，则HTTP请求默认为Connection: keep-alive，它的可能值如下：
  undefined（默认）：对当前host和port，使用全局Agent。
  Agent：一个对象，会传入agent属性。
  false：不缓存连接，默认HTTP请求为Connection: close。
keepAlive：一个布尔值，表示是否保留socket供未来其他请求使用，默认等于false。
keepAliveMsecs：一个整数，当使用KeepAlive的时候，设置多久发送一个TCP KeepAlive包，使得连接不要被关闭。默认等于1000，只有keepAlive设为true的时候，该设置才有意义。

request方法的callback参数是可选的，在response事件发生时触发，而且只触发一次。

http.request()返回一个http.ClientRequest类的实例。它是一个可写数据流，如果你想通过POST方法发送一个文件，可以将文件写入这个ClientRequest对象。

注意，上面代码中，req.end()必须被调用，即使没有在请求体内写入任何数据，也必须调用。因为这表示已经完成HTTP请求。

发送过程的任何错误（DNS错误、TCP错误、HTTP解析错误），都会在request对象上触发error事件。
*/

/**
 * 方法三：Request库
 */
/**
 * 方法四：Axios库
 */
/**
 * 方法五：SuperAgent库
 */
/**
 * 方法六：Got库
 */
// 方法n...