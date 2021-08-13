//Merrick Qiu ©2018 
//SETUP
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
//CONFIG FILE
const config = require("./config.json");
const prefix = config.prefix;
const premium = config.premium;

//USER CLASS
class user{
	constructor(){
		this.fish = false;
		this.slot = false;
		this.tg = false;
	}
}
//CREATE USERS
const length = premium.length;
for(var i = 0; i<length;i++){
	const objectName = "U"+premium[i];
	eval("var " + objectName + " = new user();");
}
//EVENT FOLDER READER
fs.readdir("./events",(err, files) => {
	if (err) return console.error(err);

	files.forEach(file =>{
		let eventFunction = require('./events/${file}');
		let eventName = file.split(".")[0];

		client.on(eventName, (...args) => eventFunction.run(client, ...args));
	});
});

//COMMAND HANDLER
client.on("message", message => {
	//Prefix
	const P = message.content.charAt(0);


	//Message Filter
 	if (message.author.bot) return;
	if(P !== prefix) {
		let nou = require(`./no_u.js`);
		nou.run(client,message);
	return;
	}

	//Defining args
	const args = message.content.slice(1).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	//Run Premium
	if(premium.includes(message.author.id)){

		try{	
			const id = "U" + message.author.id; 
			const user = eval(id);
			let commandFile = require(`./commands/${command}.js`);
			commandFile.run(client,message,args,user);		
		}
		catch (err){
			console.error(err);
		}
	}
});

//CLIENT LOGIN
client.login(config.token);