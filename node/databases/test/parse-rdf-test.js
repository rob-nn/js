'use strict';

const fs = require('fs');
const expect = require('chai').expect;

console.log(`${__dirname}/pg132.rdf`);
const rdf = fs.readFileSync(`${__dirname}/pg132.rdf`);

const parseRDF = require('../lib/parse-rdf.js');

describe('parseRDF', () => {
	it('should be a function', () => {
		expect(parseRDF).to.be.a('function');
	});
});
