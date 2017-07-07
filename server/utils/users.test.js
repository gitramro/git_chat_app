const expect = require('expect');
const {Users} =require('./users');

describe('Users',()=>{

var users;

	beforeEach(()=>{
		usuarios=new Users();
		usuarios.users =[{
			id:'1',
			name:'Mike',
			room:'Node Course'
		},{
			id:'2',
			name:'Jen',
			room:'React Course'
		},{
			id:'3',
			name:'Julie',
			room:'Node Course'
		}]
	});

	it('should add new user',()=>{
		var usuarios=new Users();
		var user={
			id:'123',
			name:'Ramón',
			room: 'League of Legends fans'
		};
		var resUser = usuarios.addUser(user.id,user.name,user.room);
		expect(usuarios.users).toEqual([user]);
	});

	it('should return names for node course',()=>{
		var userList=usuarios.getUserList('Node Course');
		expect(userList).toEqual(['Mike','Julie']);
	});
	it('should return names for react course',()=>{
		var userList=usuarios.getUserList('React Course');
		expect(userList).toEqual(['Jen']);
	});

	it('should remove a user',()=>{
		var userId='1';
		var user=usuarios.removeUser(userId);
		expect(user.id).toBe(userId);
		expect(usuarios.users.length).toBe(2);

	});

	it('should not remove user',()=>{
		var userId='23';
		var user=usuarios.removeUser(userId);
		expect(user).toNotExist();
		expect(usuarios.users.length).toBe(3);

	});

	it('should find user',()=>{
		var userId='2';
		var user=usuarios.getUser(userId);

		expect(user.id).toBe(userId);

	});

	it('should not find user',()=>{
		var userId='23';
		var user=usuarios.getUser(userId);

		expect(user).toNotExist();

	});



});