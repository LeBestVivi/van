const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  msg.channel.send(bot.ping + ":ping_pong:")
  }

module.exports.help = {
  name: "ping"  
}
