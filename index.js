const fs = require("fs");
const config = require("./config.json");
const Discord = require('discord.js'); 
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
//var Config = require("node-json-config");
//const { CommandoClient } = require('discord.js-commando'); 
//const path = require('path');

//var conf = new Config("./config.json")

//var prefix = "!";

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

client.on("message", async message => { 
	if(message.author.bot) return; 
	if(message.channel.type === "dm") return; 
	
	let prefix = config.prefix; 
	let messageArray = message.content.split(" "); 
	let cmd = messageArray[0]; 
	let args = messageArray.slice(1); 
	
	let commandfile = client.commands.get(cmd.slice(prefix.length)); 
	if(commandfile) commandfile.run(client,message,args);
});

client.login(config.token);
