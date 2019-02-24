const fs = require("fs");
const config = require("./config.json");
const Discord = require('discord.js'); 
const sqlite3 = require('sqlite3');
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

let db = new sqlite3.Database('./guild.db');

client.on("ready", async () => { 
	console.log(`${client.user.username} is online on ${client.guilds.size} servers!`); 
	client.user.setActivity("the road.", {type: "WATCHING"}); //
}); 

client.on("message", async message => { 
	if(message.author.bot) return; 
	if(message.channel.type === "dm") {
		client.channels.find("id", "530367775420448783").send("```\n" + message.author.username + " said: " + message.content + "```")
		client.channels.find("id", "530367775420448783").send(message.author.id);
	} else {
		db.all("SELECT prefix FROM guild WHERE id = " + message.guild.id + "", function (err, rows) {
			if(rows[0] === undefined){
				db.run(`INSERT INTO guild(id, prefix) VALUES(?, ?)`, [message.guild.id, config.prefix], function(err) {
					if (err) {
						return console.log(err.message);
					}
					db.all("SELECT id FROM guild WHERE id = " + message.guild.id + "", function (err, rows) {
						if(err){
							console.log(err);
						} else {
							let prefix = rows[0].prefix;
							if(!message.content.startsWith(prefix)) return;
							let messageArray = message.content.split(" "); 
							let cmd = messageArray[0]; 
							let args = messageArray.slice(1); 
							
							let commandfile = client.commands.get(cmd.slice(prefix.length)); 
							if(commandfile) commandfile.run(client,message,args);
						}
					});
					//console.log(`A row has been inserted with rowid ${this.lastID}`);
				});
			} else {
				let prefix = rows[0].prefix;
				if(!message.content.startsWith(prefix)) return;
				let messageArray = message.content.split(" "); 
				let cmd = messageArray[0]; 
				let args = messageArray.slice(1); 
				
				let commandfile = client.commands.get(cmd.slice(prefix.length)); 
				if(commandfile) commandfile.run(client,message,args);
			}
		});
		
	}
});

client.login(config.token);
    
process.on("unhandledRejection", err => {
    console.error(`UnhandledRejection: \n${err.stack}`)
});

process.on("uncaughtException", err => {
    console.error(`UncaughtException: \n${err.stack}`)
});