'use strict'

const fs = require('fs');
const spawn = require('child_process').spawn;

const fileName = process.argv[2];

if (!fileName) {
	throw Error('A file name must be informed');
}

fs.watch(fileName, () => {
	const ls = spawn('ls', ['-l', '-h', fileName]);
	let output = '';

	ls.stdout.on('data', chunk => {
		output += chunk.toString();	
	});

	ls.on('close', () => {
		const parts = output.split(/\s+/);
		console.log([parts[0], parts[4], parts[8]]);
	});
});

console.log(`Now watching ${fileName} ...`);

