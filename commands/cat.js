const superagent = require("superagent")
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let {body} = await superagent
    .get(`http://aws.random.cat//meow`)
    let embed = new Discord.RichEmbed()
    .setImage(body.file)
    .setColor("7289DA")
    message.channel.send(embed)
}

module.exports.help = {
  name: "cat"
}
