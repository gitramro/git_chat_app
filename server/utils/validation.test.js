const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString',()=>{
	it('should reject non-string values',()=>{
		var number = 23;
		var test= isRealString(number);

		expect(test).toBe(false);
	});

	it('should reject string with only spaces',()=>{
		var spaces = '       ';
		var test= isRealString(spaces);

		expect(test).toBe(false);
	});

	it('should allow string with non-space characters',()=>{
		var string = '    string    ';
		var test= isRealString(string);

		expect(test).toBe(true);
	});


	});