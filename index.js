const fs = require('fs');
const http = require('http');
// const url = require('url');

// Non blocking way of reading and writing files
// async function processFiles() {
// 	try {
// 		const textInput = await fs.readFile('./txt/input.txt', 'utf8');
// 		console.log(textInput);

// 		const textOutput = `This is what we know about the avocado: ${textInput}.\nCreated on ${new Date().toLocaleString()}`;
// 		await fs.writeFile('./txt/output.txt', textOutput);
// 	} catch (err) {
// 		console.error(`Error: ${err}`);
// 	} finally {
// 		console.log('File processing done!');
// 	}
// }

// processFiles();

// Server

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const server = http.createServer((req, res) => {
	const pathName = req.url;
	if (pathName === '/' || pathName === '/overview') {
		res.end('This is the OVERVIEW');
	} else if (pathName === '/product') {
		res.end('This is the PRODUCT');
	} else if (pathName === '/api') {
		res.writeHead(200, {
			'Content-Type': 'application/json',
		});
		res.end(data);
	} else {
		res.writeHead(404, {
			'Content-Type': 'text/html',
			'my-own-header': 'hello-world',
		});
		res.end('Page not found');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Server is listening on port 8000');
});
