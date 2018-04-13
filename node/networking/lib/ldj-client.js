'use strict';

const EventEmitter = require('events').EventEmitter;

class LDJClient extends EventEmitter {

	constructor(stream) {
		super();
		if (!stream) {
			throw new Error('Stream must not be null.');
		}
		let buffer = '';
		let messageCompleted = false;	
		stream.on('data', chunk => {
			if (typeof chunk !== 'string') {
				this.emit('message', {type:"error", message: 'Not a string object in data event'}); 
			} else { 
				if (buffer = '') {
					const time = setTimeout(()=> {
						if (!messageCompleted){ 	
							this.emit('message', {type:"error", message: 'timeout'}); 
							buffer = '';
						}
					}, 500);
				} else {
					messageCompleted = false;
				}
				buffer += chunk;
				let boundary = buffer.indexOf('\n');
				while(boundary !== -1) {
					const input = buffer.substring(0, boundary);
					buffer = buffer.substring(boundary +1);
					let obj = null;
					try {
						obj = JSON.parse(input);
						console.log(obj);
					}
					catch (error) {
						console.log('erro!');
						this.emit('message', {type:"error", message: error.toString()}); 
					}	
					if (obj) {
						this.emit('message', obj);
					}
					boundary = buffer.indexOf('\n');
					messageCompleted = true;
				}
			}
		});
	}

	static connect(stream) { 
		return new LDJClient(stream);
	}
}

module.exports = LDJClient;
