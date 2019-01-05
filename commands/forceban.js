const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if(!args[0]){
        return message.channel.send(`Command **forceban** requires 1 argument (\`<snowflake:[reason]..>\`) passed 0`)
    }
    var reason = args.slice(1).join(" ");
    var person = args[0]
    var now = new Date()
    if(!reason){
        message.guild.fetchBans()
        .then(bans => {
            if (bans.has(person)){
                return message.channel.send(`That user is already banned.`)
            }
            message.guild.ban(person, reason)
                .then( async (member) => {
                  let user;
                if( member instanceof Discord.GuildMember ){
                    user = member.user;
                }
                else if( member instanceof Discord.User ){
                    user = member;
                }
                else{
                    user = await client.fetchUser(member);
                }
                    message.channel.send(`:ok_hand: Forcebanned ${user.tag} (\`No reason provided.\`)`);
                })
                .catch(error => {
                    message.channel.send(`Something went wrong, perhaps try again later`);
                    console.error('Something went wrong:', error);
                });
        });
    } else {
        message.guild.fetchBans()
        .then(bans => {
            if (bans.has(person)){
                return message.channel.send(`They are already banned.`)
            }
            message.guild.ban(person, reason)
                .then( async (member) => {
                  let user;
                if( member instanceof Discord.GuildMember ){
                    user = member.user;
                }
                else if( member instanceof Discord.User ){
                    user = member;
                }
                else{
                    user = await client.fetchUser(member);
                }
                    message.channel.send(`:ok_hand: Forcebanned ${user.tag} (\`${reason}\`)`);
                })
                .catch(error => {
                    message.channel.send(`Something went wrong, perhaps try again later`);
                    console.error('Something went wrong:', error);
                });
        });
    }
        
}

module.exports.help = {
  name: "forceban"
}