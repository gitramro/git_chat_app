var expect = require('expect');
var{generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage',()=>{
	it('should generate correct message object',()=>{
		var from = 'Jen';
		var text = 'Some message';
		var message = generateMessage(from,text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			text
		});
	});

 describe('generateLocationMessage',()=>{
 	it('should generate correct location object',()=>{
 		var latitude=1;
 		var longitde=1;
 		var from='someone';
 		var url ='https://www.google.com/maps?q=1,1';
 		var message = generateLocationMessage(from,latitude,longitde);

 		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({
			from,
			url
		});
 		
 	});
 });
});