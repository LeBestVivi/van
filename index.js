const Discord = require('discord.js'); 
const client = new Discord.Client(); 
var Config = require("node-json-config");

var conf = new Config("./config.json")

var prefix = "!"

client.on('ready', () => { 
	console.log(`Logged in as ${client.user.tag}!`); 
}); 

client.on('message', msg => { 
	if (msg.author.bot) return;
	
	const args = msg.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if (command === 'ping') { 
		msg.reply('Pong!'); 
	} 
	
	if (command === 'pull') {
		var process = require('child_process'); 
		
		process.exec('git pull origin master',function (err,stdout,stderr) { 
			if (err) { 
				console.log("\n"+stderr); 
			} else { 
				console.log(stdout); 
			} 
		});
	}
}); 

client.login(conf.get("token"));