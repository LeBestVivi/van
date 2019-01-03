const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if(!bUser) return msg.channel.send("```Can't find that user!```");
    let bReason = args.join(" ").slice(22);
    if(!msg.member.hasPermission("MANAGE_MEMBERS")) return msg.channel.send("```You dont have the needed permissions to execute the ban hammer.```");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("```That person cannot be banned!```");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Ban")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${msg.author.id}> with ID ${msg.author.id}`)
    .addField("Banned In", msg.channel)
    .addField("Time", msg.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = msg.guild.channels.find(`name`, "logs");
    if(!incidentchannel) return msg.channel.send("```Can't find logs channel.```");

    msg.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);
    msg.channel.send("```The user has been banned.```")
}

module.exports.help = {
  name:"ban"
}
