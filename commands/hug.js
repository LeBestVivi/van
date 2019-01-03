const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  if (!args[0]) {
			return msg.reply("```Uh oh! You need to mention someone!```")
  }
  msg.channel.send("<@" + msg.author.id + "> hugged " + args[0] + " so bad that they both exploded.\nhttps://media.giphy.com/media/XUFPGrX5Zis6Y/giphy.gif")
}

module.exports.help = {
  name: "reload"
}
