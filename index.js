const Discord = require('discord.js'); 
const client = new Discord.Client(); 

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
}); 

client.login('NTI5NzYwMjQ5MTYzNTQ2NjQ1.Dw1hTw.hAQ1Kzc8mlSID9poxE1nlJVNn-4');
