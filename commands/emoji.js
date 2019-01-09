const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
	
	var Attachment = (msg.attachments).array()
	
	if(!args[0]) return msg.channel.send("```Please use the correct format:\n!emoji create [link] [name] |\n!emoji create [name] - can only be used if an attachment is sent with the command |\n!emoji remove [name]```");
	
	//if(args[0] != "create" || "remove") return msg.channel.send("```Please use the correct format:\n!emoji create [link] [name] |\n!emoji create [name] - can only be used if an attachment is sent with the command |\n!emoji remove [name]```")

	if (args[0] === "create") {	
		if (!Attachment[0]) {
			if (!args[1].startsWith("https")) return msg.channel.send("```Please provide a valid link.```");
			
    		msg.guild.createEmoji(args[1], args[2]) 
  	  		.then(emoji => msg.channel.send("```Created new emoji with name [" + emoji.name + "] in the guild.```")) 
  	  		.catch(console.error);
  	  } else {
    		msg.guild.createEmoji(Attachment[0].url, args[1]) 
  	  		.then(emoji => msg.channel.send("```Created new emoji with name [" + emoji.name + "] in the guild.```")) 
  	  		.catch(console.error);
    	}
    } else if (args[0] === "remove") {
    	const Eemoji = client.emojis.get(args[1]);
    	
    	msg.guild.deleteEmoji(args[1])
    		.then(emoji => msg.channel.send("```Removed the [" + Eemoji.name + "] emoji from the guild.```")) 
    		.catch(console.error);
    } else if (args[0] === "edit") {
    	const Eemoji = client.emojis.get(args[1]);
    	
    	msg.guild.deleteEmoji(args[1])
    		.then(emoji => {
    			msg.channel.send("```Edited the [" + Eemoji.name + "], new emoji name is [" + args[2] + "].```")
    			msg.guild.createEmoji(Eemoji.url, args[2])
    		}).catch(console.error);
    }


}

module.exports.help = {
  name: "emoji"
}
    
    
    
