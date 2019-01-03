const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, msg, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if(!tomute) return msg.reply("```Could not find thay user.```");
  if(tomute.hasPermission("MANAGE_MESSAGES")) return msg.reply("```Can't mute that user.```");
  let muterole = msg.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await msg.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return msg.reply("```Please specify a time!```");

  await(tomute.addRole(muterole.id));
  msg.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    msg.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));


//end of module
}

module.exports.help = {
  name: "tempmute"
}
