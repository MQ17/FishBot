//TIMER FOR SLOTS
exports.run = (client, message, user,args) => {
	if((args.length === 0 || !isNaN(args[0]))&&!user.slot[0]){
		const author = message.author.username;
    	message.channel.send(author+"\'s slot timer started").catch(console.error);
    	user.slot[0] = true;
    	setTimeout(function() {
 		   	message.channel.send(author + ", gamble now!");
 		   	user.slot[0] = false;
		}, 10500);
	}
}