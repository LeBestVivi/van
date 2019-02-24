const Discord = require("discord.js");
const sqlite3 = require("sqlite3");

let db = new sqlite3.Database('./guild.db');

module.exports.run = async (client, msg, args) => {
	if(!msg.member.hasPermission("MANAGE_MEMBERS")) return msg.channel.send("```You dont have the needed permissions to change the prefix.```");
	
	if(!args[0]) return;
	
    db.run(`INSERT INTO guild(id, prefix) VALUES(?, ?)`, [msg.guild.id, args[0]], function(err) {
    if (err) {
      return console.log(err.message);
    }
		//console.log(`A row has been inserted with rowid ${this.lastID}`);
		msg.channel.send("```The command prefix has been changed to " + args[0] + "```");
	});
}

module.exports.help = {
  name: "prefix"
}
    