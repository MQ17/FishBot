//Merrick Qiu ©2018 
//SETUP
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
//CONFIG FILE AND OTHER REQUIREMENTS
const config = require("./config.json");
const user = require("./user.js");
const nou = require(`./no_u.js`);
const prefix = config.prefix;
const premium = config.premium;
const tatcommands = ["fish","slot","tg"];
const coolmessages = config.messages;
//CREATE USERS
const length = premium.length;
for(var i = 0; i<length;i++){
	const objectName = "U"+premium[i];
	eval("var " + objectName + " = new user();");
}
//EVENT FOLDER READER
fs.readdir("./events/", (err, files) => {
  //if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

//COMMAND HANDLER
client.on("message", message => {

	if(!premium.includes(message.author.id)) return;
	if (message.author.bot) return;
	//Prefix
	const P = message.content.charAt(0);
	//Ping Check
	if(message.isMentioned(client.user)){
		const rng = Math.floor(Math.random()*coolmessages.length);
  		message.channel.send(coolmessages[rng]).catch(console.error);
    }
	//Message Filter
	if(P !== prefix) {
		nou.run(client,message);
		return;
	}

	//Defining args
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	const id = "U" + message.author.id; 
	const user = eval(id);

	//Spam filter
	if (tatcommands.includes(command)) {
		if (eval(id+"."+command+"[1]")) return;
		else{
			eval(id+"."+command+"[1] = true;");
			setTimeout(function() {
				eval(id+"."+command+"[1] = false;");
			}, 10500);
		}
	}
	//Run Premium
	try{	
		let commandFile = require(`./commands/${command}.js`);
		commandFile.run(client,message,user,args);		
	}
	catch (err){
	//	console.error(err);
	}
});

//CLIENT LOGIN
client.login(config.token);