const Discord = require("discord.js");
const config = require("../config.json")

module.exports.run = async (client, msg, args) => {
	if(msg.author.id != config.owner) return;
	
	
  
  message.author.send('Are you sure?')
      .then(function(){
        message.channel.awaitMessages(response => message.content, {
          max: 1,
          time: 300000,
          errors: ['time'],
        })
        .then((collected) => {
            if (collected.first().content === "y" || "yes") {
            msg.channel.send("```Stopping.```");
            
            var process = require('child_process'); 
		
	process.exec('pm2 stop van',function (err,stdout,stderr) { 
		if (err) { 
			console.log("\n"+stderr); 
			msg.channel.send("```\n"+stderr+"```");
		} else { 
			console.log(stdout); 
			msg.channel.send("```\n" + stdout + "```");
		} 
	});
          })
          .catch(function(){
            message.channel.send('```You didn't send anything. Cancelling.```');
          });
      });
  }
		
};

module.exports.help = { 
	name: "stop"
}
