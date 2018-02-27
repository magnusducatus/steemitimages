const http = require('http');
const fs = require('fs');
let i = 0;
function handler(req, res) {
	let stream;
	i++
	console.log(req.url,i);
	let path = req.url;
	if(req.url == '/'){
		console.log('/');
		res.writeHead(200,{'Content-Type':'text/html'});
		const cont = fs.createReadStream('./index.html');
		cont
			.pipe(res);
	}
	if(path.match(/\.js/gi)) {
		console.log('auth');
		res.writeHead(200,{'Content-Type':'text/javascript'});
		const cont = fs.createReadStream('.'+path);
		cont
			.pipe(res);
	}
	if(req.url == 'favicon.ico') {
		res.writeHead(200,{'Content-Type':'text/javascript'});
		res.end();
	}
	if(path.match(/\.css/gi)){
		res.writeHead(200,{'Content-Type':'text/css'});
		const cont = fs.createReadStream('.'+path);
		cont
			.pipe(res);
	}

}
const server = http.createServer(handler);

server.listen(7777,() => {
	console.log('server start '+' 7777');
});