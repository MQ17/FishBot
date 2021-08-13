//TIMER FOR FISHING
exports.run = (client, message,user) => {
	if(message.content.trim() === "!fish" && !user.fish[0]){
		const author = message.author.username;
    	message.channel.send(author+"\'s fish timer started").catch(console.error);
    	user.fish[0] = true;
    	setTimeout(function() {
 		   	message.channel.send(author + ", fish now!");
 		   	user.fish[0] = false;
		}, 30500);
	}
}