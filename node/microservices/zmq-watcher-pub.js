'use strict';

console.log("Starting...");
const fs = require('fs');
console.log("Requesting zeromq");
const zmq = require('zeromq');
console.log("Getting file name...");
const filename = process.argv[2];

const publisher = zmq.socket('pub');
fs.watch(filename, () => {
	publisher.send(JSON.stringify({
		type: 'changed',
		file: filename,
		timestamp: Date.now()
	}));
});

publisher.bind('tcp://*:60400', err=> {
	if (err) {
		throw err;
	}
	console.log('Listening for zmq subscribers...');
});
