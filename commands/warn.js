const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (client, msg, args) => {

  //!warn @daeshan <reason>
  if(!msg.member.hasPermission("MANAGE_MEMBERS")) return msg.reply("You don't have the needed permission to warn users.");
  let wUser = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.get(args[0])
  if(!wUser) return msg.reply("```Could not find that user.```");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return mdg.reply("```You can't warn that user.```");
  let reason = args.join(" ").slice(22);

  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(msg.author.username)
  .setColor("#7289DA")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", msg.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = msg.guild.channels.find(`name`, "logs");
  if(!warnchannel) return msg.reply("```Couldn't find the logs channel.```");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 2){
    let muterole = msg.guild.roles.find(`name`, "Muted");
    if(!muterole) return msg.reply("```Please create a role called **Muted** with no permissions.```");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    msg.channel.send(`<@${wUser.id}> has been temporarily muted.`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      msg.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 3){
    msg.guild.member(wUser).kick(reason);
    msg.reply(`<@${wUser.id}> has been kicked.`)
  }

}

module.exports.help = {
  name: "warn"
}
