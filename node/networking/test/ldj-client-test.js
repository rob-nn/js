'use strict';

const assert = require('assert');
const EventEmitter = require('events').EventEmitter;
const LDJClient = require('../lib/ldj-client.js');

describe('LDJClient', () => {
	let stream = null;
	let client = null;

	beforeEach(()=> {
		stream = new EventEmitter();
		client = new LDJClient(stream);
	});

	it('should emit a message event from a single data event', done => {
		client.on('message', message => {
			assert.deepEqual(message, {foo: 'bar'});
			done();
		});
		stream.emit('data', '{"foo":"bar"}\n');
	});
	it('should emit a message event from split data events', done=> {
		client.on('message', message=> {
			assert.deepEqual(message, {foo: 'bar'});
			done();
		});
		stream.emit('data', '{"foo":');
		process.nextTick(()=>stream.emit('data', '"bar"}\n'));
	});

	it('should throw an error when LDJClient constructor receives null', done => {
		try {
			client = new LDJClient(null);
			assert.fail("It does not throws error");
		} catch (e) {
		}	
		finally {
			done();
		}
	});
	
	it('should receives an type error message  when LDJClient receives a message with an invalid JSON object', done => {
		client.on('message', message  => {
			assert.deepEqual(message.type, 'error');
			done();
		});
		stream.emit('data', '{fool:\n');
	});
	
	it('should receive an typé error message when LDJCLient receives a data with no JSON.', done => {
		client.on('message', message => {
			assert.deepEqual(message.type, 'error');
			done();
		});
		stream.emit('data', new Date());
	});

	it('should receive a timeout error message when LDJClient receives a JSON obj without a new line', done=>{
		client.on('message', message=> {
			assert.deepEqual(message.type, 'error');
			assert.deepEqual(message.message, 'timeout');
			done();
		});
		stream.emit('data', '{"fool":"bar"}');
	});
});

