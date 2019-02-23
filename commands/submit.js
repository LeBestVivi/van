const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (client, msg, args) => {
  if(msg.guild.id =! "493347937649295371") return;

  let sUser = msg.author
  
  var Attachment = (msg.attachments).array();
  
  if(!Attachment[0]) {
  	let submitEmbed = new Discord.RichEmbed()
  	.setDescription("New submission")
  	.setAuthor(msg.author.username)
  	.setColor("#7289DA")
  	.addField("Submitter:", "<@" + sUser.id + "> | `" + sUser.id + "`")
  	.addField("Emoji name:", args[1])
  	.addField("Emoji:", args[2]);  
  	
  	let submitchannel = msg.guild.channels.find(`name`, "submissions");
  	if(!submitchannel) return msg.reply("```Couldn't find the submissions channel.```");
 
  	msg.channel.send("Succesfully submitted your emoji!")
  	warnchannel.send(submitEmbed);
  } else {
  	let submitEmbed = new Discord.RichEmbed()
  	.setDescription("New submission")
  	.setAuthor(msg.author.username)
  	.setColor("#7289DA")
  	.addField("Submitter:", "<@" + sUser.id + "> | `" + sUser.id + "`")
  	.addField("Emoji name:", args[1])
  	.addField("Emoji:", "** **")
  	.setImage(Attachment[0].url);
  	
  	let submitchannel = msg.guild.channels.find(`name`, "submissions");
  	if(!submitchannel) return msg.reply("```Couldn't find the submissions channel.```");
     
  	msg.channel.send("Succesfully submitted your emoji!")
  	warnchannel.send(submitEmbed);
  }


}

module.exports.help = {
  name: "submit"
}
    