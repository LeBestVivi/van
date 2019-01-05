const moment = require("moment");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
    var now = new Date()
    if(args.length < 2){
        return message.channel.send(`Command **remind** requires 2 arguments (\`<time:string..>\`) passed ${args.length}`)
    }
    var remindtime = args[0]
    var reason = args.slice(1).join(" ")
    var newtimestamp = message.createdTimestamp + ms(remindtime)
    message.channel.send(`:ok_hand: I'll remind you at ${moment(newtimestamp).format()} (in ${ms(ms(remindtime))})`)
  setTimeout(function(){
    message.channel.send(`${message.author} You asked me at ${moment(message.createdTimestamp).format()} (${moment(message.createdTimestamp).fromNow()}) to remind you about: ${reason}`)
}, ms(remindtime))
}

module.exports.help = {
  name: "remind"
}
