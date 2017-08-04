const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
var publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var usuarios = new Users();




app.use(express.static(publicPath));

io.on('connection',(socket)=>{ //event listener
	// console.log('New user connected');




	socket.on('join',(params,callback)=>{
		console.log(`${params.name} connected.`);
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Name and room name are required');
		}

		if(usuarios.users.filter((user) => user.name.toUpperCase() === params.name.toUpperCase() && user.room === params.room)[0]){  //MINE
			return callback('Name already used');
		}

		if(usuarios.getUserRoomList()){
			usuarios.getUserRoomList().forEach((room)=>{
				if(params.room.toUpperCase() === room.toUpperCase()){
					params.room=room;
				}
			})
		}


		socket.join(params.room);
		usuarios.removeUser(socket.id); //remove user from any previous room
		usuarios.addUser(socket.id,params.name,params.room);
		io.to(params.room).emit('updateUserList',usuarios.getUserList(params.room),usuarios.getUserList(params.room).length,params.room); //third argument for counter of people
		socket.emit('newMessage',generateMessage('Admin',' Welcome to the room'));
		socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
		callback();
	});

	socket.on('createMessage',(message,callback)=>{
		// console.log('Create message',message);
		var user = usuarios.getUser(socket.id);
		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
		}

		callback();
	});

	socket.on('createLocationMessage',(coords)=>{
		var user = usuarios.getUser(socket.id);
		if(user){
				io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
		}

	});

	socket.on('disconnect',()=>{
		var user = usuarios.removeUser(socket.id);
		if(user){
			io.to(user.room).emit('updateUserList',usuarios.getUserList(user.room),usuarios.getUserList(user.room).length,user.room); //third argument for counter of people
			io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left.`));
			console.log(`${user.name} disconnected.`);
		}
	});
});

server.listen(port,()=>{
	console.log(`Server is up on ${port}`);
});


// old (before rooms)

//io.emit   				--> emits to every single connected user
//socket.broadcast.emit 	--> sends message to everyone connected to the socket server except for the current user
//socket.emit				--> emits an event specifically to one user
