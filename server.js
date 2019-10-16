// http://127.0.0.1:8080/  - Use to access in browser
const http = require('http'),
  url = require('url'),
  fs = require('fs');
http
  .createServer((request, response) => {
    var addr = request.url;
    var q = url.parse(addr, true);
    var filePath = '';
    if (q.pathname.includes('documentation')) {
      filePath = (__dirname + '/documentation.html');
    } else {
      filePath = 'index.html';
    }

    fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', function(err) {
      if (err) {
        console.log(err);
      } else {

        // *** QUESTION Do I need to have this console here? I noticed this function is logging 2 timestamps to log.txt
        console.log(addr + Date);
      }
    })

    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    response.end('Hello Punk!\n');
  })
  .listen(8080);
