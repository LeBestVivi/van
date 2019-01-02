const Discord = require("discord.js"); 

module.exports.run = async (client, msg, args) => {
	msg.channel.send('Hi, I am awake!'); 
		
};

module.exports.help = { 
	name: "reply"
}
