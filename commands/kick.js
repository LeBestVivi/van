const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let kUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
    if(!kUser) return msg.channel.send("```Can't find the user!```");
    let kReason = args.join(" ").slice(22);
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("```You don't have the needed permissions to execute the kick command!```");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return msg.channel.send("```That person cannot be kicked!```");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kick")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${msg.author.id}> with ID ${msg.author.id}`)
    .addField("Kicked In", msg.channel)
    .addField("Time", msg.createdAt)
    .addField("Reason", kReason);

    let kickChannel = msg.guild.channels.find(`name`, "logs");
    if(!kickChannel) return msg.channel.send("```Can't find logs channel.```");

    msg.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);
    msg.channel.send("```The user has been banned.```")
}

module.exports.help = {
  name:"kick"
}
