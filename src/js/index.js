const http = require('http');

http.createServer((req, res) => {
    res.writeHead(200, { 'Cotent-Type': 'text/plain; charset=utf-8' });
    res.write('Hello World');
    res.end();
}).listen(8888, () => {
    console.log('8888번 포트에서 서버 대기 중입니다!');
});
