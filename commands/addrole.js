const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You dont have the needed permissions to execute this command.");
  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!rMember) return message.reply("I couldn't find that user.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("Please specify a role.");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("I couldn't find that role.");

  if(rMember.roles.has(gRole.id)) return message.reply("The user already has that role.");
  await(rMember.addRole(gRole.id));

  try{
    await rMember.send(`Congrats, you got the role ${gRole.name}`)
    message.channel.send(`Congrats to <@${rMember.id}>, they got the role ${gRole.name}.`)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`Congrats to <@${rMember.id}>, they got the role ${gRole.name}.`)
  }
}

module.exports.help = {
  name: "addrole"
}
