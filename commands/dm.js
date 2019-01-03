const Discord = require("discord.js");

module.exports.run = async (client, msg, args) => {
    let messagesend = args.join(" ").slice(19);
    
    client.users.find("id", args[0]).send(messagesend);

    msg.channel.send("```Sent.```")
}

module.exports.help = {
  name: "dm"
}
    
