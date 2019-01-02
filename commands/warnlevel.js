const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, msg, args) => {
	
  let wUser = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0])

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };
  
  if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("You can't do that.");
  if(!wUser) return msg.reply("I could not find that user.");
  let warnlevel = warns[wUser.id].warns;

  msg.reply(`<@${wUser.id}> has ${warnlevel} warnings.`);

}

module.exports.help = {
  name: "warnlevel"
}
