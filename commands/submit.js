const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let submit = JSON.parse(fs.readFileSync("./submissions.json", "utf8"));

module.exports.run = async (client, msg, args) => {

  let sUser = msg.author
  
  var Attachment = (message.attachments).array();

  if(!submission[sUser.id]) submission[sUser.id], link[sUser.id] = {
    submission: args[1],
    link: args[2]
  };

  fs.writeFile("./submissions.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });
  
  if(!Attachment[0]) {
  	let warnEmbed = new Discord.RichEmbed()
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
  	let warnEmbed = new Discord.RichEmbed()
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
  name: "warn"
}
    