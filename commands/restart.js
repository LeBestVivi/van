const Discord = require("discord.js");
const config = require("../config.json")

module.exports.run = async (client, msg, args) => {
	if(msg.author.id != config.owner) return;
	
	var process = require('child_process'); 
	
	msg.channel.send("```Restarting...```")
		
	process.exec('pm2 start van',function (err,stdout,stderr) { 
		if (err) { 
			console.log("\n"+stderr); 
			msg.channel.send("```\n"+stderr+"```");
		} else { 
			console.log(stdout); 
			msg.channel.send("```\n" + stdout + "```");
		} 
	});
		
};

module.exports.help = { 
	name: "restart"
}
