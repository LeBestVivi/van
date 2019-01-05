const fs = require("fs");
const config = require("./config.json");
const Discord = require('discord.js'); 
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => { 
	if(err) console.log(err); 
	
	let jsfile = files.filter(f => f.split(".").pop() === "js") 
	if(jsfile.length <= 0){
		console.log("Couldn't find commands.");
		return;
	} 
	jsfile.forEach((f, i) =>{ 
		let props = require(`./commands/${f}`); 
		console.log(`${f} loaded!`); 
		
		client.commands.set(props.help.name, props); 	
	}); 
}); 

client.on("ready", async () => { 
	console.log(`${client.user.username} is online on ${client.guilds.size} servers!`); 
	client.user.setActivity("my engine.", {type: "WATCHING"}); //
}); 

client.on('emojiCreate', emoji => { 
	if (emoji.guild.id === '493347937649295371') {
		client.guilds.get('493347937649295371').channels.get('510909552070361091').send(`<:green_tick:510906637209305088> Added **${emoji.name}**.`);
	}
}); 

client.on('emojiDelete', emoji => { 
	if (emoji.guild.id === '493347937649295371') {
		client.guilds.get('493347937649295371').channels.get('510909552070361091').send(`<:red_tick:510906637771472906> Deleted **${emoji.name}**.`);
	}
});

client.on('emojiUpdate', emoji => { 
	if (emoji.guild.id === '493347937649295371') {
		client.guilds.get('493347937649295371').channels.get('510909552070361091').send(`:pencil: Updated **${emoji.name}**.`);
	}
});

client.on("message", async message => { 
	if(message.author.bot) return; 
	if(message.channel.type === "dm") {
		client.channels.find("id", "530367775420448783").send("```\n" + message.author.username + " said: " + message.content + "```")
		client.channels.find("id", "530367775420448783").send(message.author.id);
	} else {
	
	if(!message.content.startsWith(config.prefix)) return;
	let prefix = config.prefix; 
	let messageArray = message.content.split(" "); 
	let cmd = messageArray[0]; 
	let args = messageArray.slice(1); 
	
	let commandfile = client.commands.get(cmd.slice(prefix.length)); 
	if(commandfile) commandfile.run(client,message,args);
	}
});

client.login(config.token);
    
