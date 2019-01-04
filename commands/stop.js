const Discord = require("discord.js");
const config = require("../config.json")

module.exports.run = async (client, msg, args) => {
	if(msg.author.id != config.owner) return;
	
	
  
    msg.channel.send('```Are you sure?```')
      .then(function(){
        msg.channel.awaitMessages(response => msg.content, {
          max: 1,
          time: 30000,
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
              })
            .catch(function(){
            	msg.channel.send("```You didn't send anything. Cancelling.```");
            });
           }
        });
     });
		
};

module.exports.help = { 
	name: "stop"
}
