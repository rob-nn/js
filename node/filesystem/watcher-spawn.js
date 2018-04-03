'user strict'

const fs = require('fs');
const spawn = require('child_process').spawn;
const fileName = process.argv[2];

if (!fileName) {
	throw Error('File to watch must be specified!');
}

fs.watch(fileName, () => {
	const ls = spawn('ls', ['-l', '-h', fileName]);
	ls.stdout.pipe(process.stdout);
});

console.log(`Now watching ${fileName} for changes...`);
