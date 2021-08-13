//1% CHANCE OF SAYING NO U AFTER MESSAGE
exports.run = (client, message) => {
	const rng = Math.floor(Math.random()*100);
	if(rng==0){
		const author = message.author.username;
    	message.channel.send("No u, " + author).catch(console.error);
	}
}