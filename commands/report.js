const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let rUser = client.guild.member(client.mentions.users.first() || client.guild.members.get(args[0]));
    if(!rUser) return client.channel.send("I could not find that user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${msg.author} with ID: ${msg.author.id}`)
    .addField("Channel", msg.channel)
    .addField("Time", msg.createdAt)
    .addField("Reason", rreason);

    let reportschannel = msg.guild.channels.find(`name`, "reports");
    if(!reportschannel) return msg.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

}
 
module.exports.help = {
  name: "report"
}
