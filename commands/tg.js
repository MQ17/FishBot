//TIMER FOR TRAINING
exports.run = (client, message, user,args) => {
	if(args[0] === "train" && !user.tg[0]){
		const author = message.author.username;

    	message.channel.send(author+"\'s training timer started").catch(console.error);
    	user.tg[0] = true;
    	setTimeout(function() {
 		   	message.channel.send(author + ", train now!");
 		   	user.tg[0] = false;

		}, 10500);
	}
}