const { Command } = require('discord.js-commando');

module.exports = class ReplyCommand extends Command { 
	constructor(client) { 
		super(client, { 
			name: 'pull', 
			group: 'group1', 
			memberName: 'pull', 
			description: 'Pulls from GitHub.', 
			examples: ['reply'] 
		}); 
	}
		
		run(msg) { 
			var process = require('child_process'); 
		
			process.exec('git pull origin master',function (err,stdout,stderr) { 
				if (err) { 
					console.log("\n"+stderr); 
					msg.channel.send("```\n"+stderr+"```");
				} else { 
					console.log(stdout); 
					msg.channel.send(stdout);
				} 
			});
		} 
		
};
