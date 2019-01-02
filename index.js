//const Discord = require('discord.js'); 
//const client = new Discord.Client(); 
var Config = require("node-json-config");
const { CommandoClient } = require('discord.js-commando'); 
const path = require('path');

var conf = new Config("./config.json")

//var prefix = "!";

const client = new CommandoClient({ 
	commandPrefix: '!', 
	unknownCommandResponse: false, 
	owner: '267025484028706816', 
	disableEveryone: true,
	unknownCommandResponse: false
}); 

client.registry 
	.registerDefaultTypes() 
	.registerGroups([ ['group1', 'Our First Command Group'] ]) 
	.registerDefaultGroups() 
	.registerDefaultCommands() 
	.registerCommandsIn(path.join(__dirname, 'commands')); 


client.on('ready', () => { 
	console.log(`Logged in as ${client.user.tag}!`); 
	client.user.setActivity('with my engine.');
}); 

client.login(conf.get("token"));
