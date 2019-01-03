const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  if(!msg.member.hasPermission("MANAGE_MEMBERS")) return msg.reply("```You don't have the needed permissions to execute this command.```");
  let rMember = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0]);
  if(!rMember) return msg.reply("```I cant find that user.```");
  let role = args.join(" ").slice(22);
  if(!role) return msg.reply("```Please specify a role.```");
  let gRole = msg.guild.roles.find(`name`, role);
  if(!gRole) return msg.reply("```I could not find that role.```");

  if(!rMember.roles.has(gRole.id)) return message.reply("The user doesen't have that role.");
  await(rMember.removeRole(gRole.id));

  try{
    await msg.channel.send(`<@${rMember.id}> doesent have the ${gRole.name} role anymore.`)
  }catch(e){
    msg.channel.send(`<@${rMember.id}> doesent have the ${gRole.name} role anymore.`)
  }
}

module.exports.help = {
  name: "removerole"
}
