const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let sicon = msg.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Info")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", msg.guild.name)
    .addField("Created On", msg.guild.createdAt)
    .addField("Joined At", msg.member.joinedAt)
    .addField("Total Members", msg.guild.memberCount);

    msg.channel.send(serverembed);
}

module.exports.help = {
  name:"serverinfo"
}
