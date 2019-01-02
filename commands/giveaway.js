const Discord = require("discord.js"); 

module.exports.run = async (client, msg, args) => {
	msg.channel.send('giveaway')
	msg.react('');
	function sendit(it) {
		msg.channel.fetchMessage(msg.id).then(r => { 
			 return console.log(r.reactions.filter(a => a.emoji.name == '👎').map(reaction => reaction.users)[1]); 
		});
	}	
	 setTimeout(sendit, 5000); 
		
};

module.exports.help = { 
	name: "giveaway"
}
