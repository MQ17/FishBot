//SAYS HOW MUCH FISHBOT LOVES YOU
exports.run = (client, message,user) => {
	user.love +=1;
	if(user.love<15){
    	message.channel.send("Im so inked right now!").catch(console.error);
	}
	else{
		message.channel.send("(You just made fishbot nut... Stop it...)").catch(console.error);
	}
}