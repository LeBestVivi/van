const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  if (!args[0]) {
  	let helpEmbed = new Discord.RichEmbed()
    	.setDescription("Help")
    	.setColor("#7289DA")
    	.addField("Moderation Commands", "**warn** - `!warn @mention [reason]`\n**warnlevel** - `!warnlevel @mention`\n**tempmute** - `!tempmute @mention [time]`\n**kick** - `!kick @mention [reason]`\n**ban** - `!ban @mention [reason]`\n**addrole** - `!addrole @mention @role`\n**removerole** - `!removerole @mention @role`\n**report** - `!report @mention [reason]`\n**clean** - `!clean [all|user] [int|id]`\n**forceban** - `!forceban [id] [reason]`\n**emoji** - `Please do !help emoji for full description of this command.`\n**prefix** - `!prefix [prefix]`")
    	.addField("Fun Commands", "**reddit** - `!reddit [subreddit]`\n**ping** - `!ping`\n**hug** - `!hug @mention`\n**reply** - `!reply`\n**avatar** - `!avatar`\n**jumbo** - `!jumbo :emoji:`")
    	.setFooter("Van | Don't use [] in commands. | Do !help [command] for more info about that command. | Requested by: " + msg.author.username);

  	msg.channel.send(helpEmbed)
  }
  
  if (args[0] === "prefix") {
	msg.channel.send("```\nChanges the guild command prefix.\n \n!prefix [prefix]```");
  }
  
  if (args[0] === "warn") {
  	msg.channel.send("```\nWarns an user.\n \n!warn @mention [reason]```");
  }
  
  if (args[0] === "warnlevel") {
  	msg.channel.send("```\nGives you how much warnings does an user have.\n \n!warnlevel @mention```");
  }
  
  if (args[0] === "tempmute") {
  	msg.channel.send("```\nTemporarily mutes an user.\n \n!tempmute @mention [time]```");
  }
  
  if (args[0] === "kick") {
  	msg.channel.send("```\nKicks an user from the guild.\n \n!kick @mention [reason]```");
  }
  
  if (args[0] === "addrole") {
  	msg.channel.send("```\nAdds a role to the user.\n \n!addrole @mention @role```");
  }
  
  if (args[0] === "removerole") {
  	msg.channel.send("```\nRemoves a role from an user.\n \n!removerole @mention @role```");
  }
  
  if (args[0] === "report") {
  	msg.channel.send("```\nReports an user.\n \n!report @mention [reason]```");
  }
  
  if (args[0] === "clean") {
  	msg.channel.send("```\nCleans messages in channel.\n \n!clean all [int] - Cleans int messages in a channel.\n!clean user @mention - Cleans all messages from an user.");
  }
  
  if (args[0] === "forceban") {
  	msg.channel.send("```\nForcebans an user from the guild.\n \n!forceban @mention [reason]```");
  }
  
  if (args[0] === "emoji") {
  	msg.channel.send("```\nManage emojis.\n \n!emoji create [link] [name] - Creates an emoji in the guild.\n!emoji create [name] - Creates an emoji in the guild. Use when sending an attachment with the command.\n!emoji remove [emoji_id] - Removes an emoji from the guild.\n!emoji edit [emoji_id] [new_name] - Edits the name of an emoji in the guild.```");
  }
  
  if (args[0] === "ping") {
  	msg.channel.send("```\nSends the current ping.\n \n!ping```");
  }
  
  if (args[0] === "reddit") {
  	msg.channel.send("```\nSends a random image from a subreddit.\n \n!reddit [subreddit]```");
  }
  
  if (args[0] === "reply") {
  	msg.channel.send("```\nTells you if the bot is awake or not..\n \n!reply```");
  }
  
  if (args[0] === "hug") {
  	msg.channel.send("```\nHug someone with this command!.\n \n!hug @mention```");
  }
  
  if (args[0] === "avatar") {
  	msg.channel.send("```\nSends a link to your avatar.\n \n!avatar - Sends a link to your avatar.\n!avatar @mention - Sends a link to the mentioned user avatar.```");
  }
  
  if (args[0] === "jumbo") {
  	msg.channel.send("```\nSends a bigger version of an emoji!\n \n!jumbo :emoji:```");
  }
}

module.exports.help = {
  name:"help"
}
