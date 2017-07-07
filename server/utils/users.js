
//addUser(id,name,room)
//removeUser(id)
//getUser(id)
//getUserList(room)

class Users{
	constructor(){
		this.users =[];
	}
	addUser(id,name,room){
		var user={id,name,room};
		this.users.push(user);
		return user;
	}
	removeUser(id){
		var user =this.users.filter((user)=>user.id===id)[0]

		if(user){
			this.users=this.users.filter((user)=>user.id!==id); //nuevo arreglo con usuarios con diferente id al del que se quiere quitar
		}

		return user;

	}
	getUser(id){
		return this.users.filter((user)=>user.id===id)[0]


	}
	getUserList(room){
		var users=this.users.filter((user)=>{
			return user.room === room
		});
		var namesArray=users.map((user)=>{
			return user.name
		});

		return namesArray;

	}
	getUserRoomList(){

		var namesRooms=this.users.map((user)=>{
			return user.room
		});

		return namesRooms;

	}
}

module.exports={Users};