const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let boticon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Info")
    .setColor("#15f153")
    .setThumbnail(boticon)
    .addField("Bot Name:", bot.user.username)
    .addField("Created At:", bot.user.createdAt)
    .addField("GitHub Repository:", "(Link)[https://github.com/vanishedvan/van]");

    msg.channel.send(botembed);
}

module.exports.help = {
  name:"botinfo"
}
