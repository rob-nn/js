'use strict'

const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
	throw Error('Specify the filename...');
}

net.createServer(connection => {
	console.log('Connection stablished...');
	connection.write('Connection stablished...');

	const watcher = fs.watch(filename, () => connection.write(`File "${filename}" changed "${new Date()}".`));
	
	connection.on('close', ()=> {
		watcher.close();
		console.log('Connection closed.');
	});
}).listen('/tmp/watcher.sock', () => console.log('Waiting connections...'));
