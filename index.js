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
	
	let prefix = config.prefix; 
	let messageArray = message.content.split(" "); 
	let cmd = messageArray[0]; 
	let args = messageArray.slice(1); 
	
	let commandfile = client.commands.get(cmd.slice(prefix.length)); 
	if(commandfile) commandfile.run(client,message,args);
	}
});

/*client.on("messageReactionAdd", reaction, user => { 
		const message = reaction.message; 
		if (reaction.emoji.name !== '⭐') return; 
		if (message.author.id === user.id) return message.channel.send(`${user}, you cannot star your own messages.`); 
		if (message.author.bot) return message.channel.send(`${user}, you cannot star bot messages.`); 
		const { starboardChannel } = this.client.settings.get(message.guild.id); 
		const starChannel = message.guild.channels.find(channel => channel.name === starboardChannel) 
		if (!starChannel) return message.channel.send(`It appears that you do not have a \`${starboardChannel}\` channel.`); 
		const fetchedMessages = starChannel.fetchMessages({ limit: 100 }); 
		const stars = fetchedMessages.find(m => m.embeds[0].footer.text.startsWith('⭐') && m.embeds[0].footer.text.endsWith(message.id)); 
		if (stars) { 
			const star = /^\⭐\s([0-9]{1,3})\s\|\s([0-9]{17,20})/.exec(stars.embeds[0].footer.text); 
			const foundStar = stars.embeds[0]; 
			const image = message.attachments.size > 0 ? this.extension(reaction, message.attachments.array()[0].url) : ''; 
			const embed = new RichEmbed() 
				.setColor(foundStar.color) 
				.setDescription(foundStar.description) 
				.setAuthor(message.author.tag, message.author.displayAvatarURL) 
				.setTimestamp() 
				.setFooter(`⭐ ${parseInt(star[1])+1} | ${message.id}`) 
				.setImage(image); const starMsg = starChannel.fetchMessage(stars.id); 
				starMsg.edit({ embed }); 
		} 
		
		if (!stars) { 
			const image = message.attachments.size > 0 ? this.extension(reaction, message.attachments.array()[0].url) : ''; 
			if (image === '' && message.cleanContent.length < 1) return message.channel.send(`${user}, you cannot star an empty message.`); 
			const embed = new RichEmbed() 
				.setColor(15844367) 
				.setDescription(message.cleanContent) 
				.setAuthor(message.author.tag, message.author.displayAvatarURL) 
				.setTimestamp(new Date()) 
				.setFooter(`⭐ 1 | ${message.id}`) 
				.setImage(image); 
				starChannel.send({ embed }); 
			} // Here we add the this.extension function to check if there's anything attached to the message. 
				
		//extension(reaction, attachment) { 
			//const imageLink = attachment.split('.'); 
			//const typeOfImage = imageLink[imageLink.length - 1]; 
			//const image = /(jpg|jpeg|png|gif)/gi.test(typeOfImage); 
			//if (!image) return ''; 
			//return attachment; 
		//}
});*/

client.login(config.token);
    
