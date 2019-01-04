const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    if (!args[0]) {
    	msg.channel.send(msg.author.avatarURL)
    } else {
    	var user = msg.mentions.users.first();
    	
    	msg.channel.send(user.avatarURL) 
    }
}

module.exports.help = {
  name: "avatar"
}
    