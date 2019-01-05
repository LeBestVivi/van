
module.exports.run = async (client, message, args) => {
    if(!args[0]){
        return message.channel.send("```Command clean requires 2 arguments (<opt:[snowflake]:integer..>) passed 0```");
    }
    if(args[0] === "all"){
        let now = new Date()
        if(!args[1]){
            return message.channel.send("```Command clean requires 2 arguments (<opt:integer..>) passed 1```");
        }
        let amount = parseInt(args[1]) + 1;
        if(isNaN(amount)){
            return message.channel.send("```Cannot convert" + args[1] + "into (integer).```");
        }
        if(amount <= 1 || amount > 100){
            return message.channel.send("```Amount must be between 1 and 100```");
        }
        let purgefunc = message.channel.bulkDelete(amount, true).catch(err => {
            console.error(err)
            return false;
        })
        if(purgefunc === false){
            return message.channel.send("```Something went wrong, perhaps try again later.```");
        }
    }
    if(args[0] === "user"){
        let now = new Date()
        if(!args[1]){
            return message.channel.send("```Command **clean** requires 2 arguments (<opt:snowflake:integer..>) passed 1```");
        }
        if(isNaN(args[1])){
            return message.channel.send("```Cannot convert" + args[1] + "into (snowflake).```");
        }
        async function userDel(amount, userId, message) {
            let messagesDeleted = 0;
            let deleteAmount = amount;
            let count = 100;
            let lastId = null;
            let fetchedOverall = 0;
            let stop = 500;
            
            do {
                let options = lastId == null ? { limit: count } : { limit: count, before: lastId };
                let fetched = await message.channel.fetchMessages(options);
                if (fetched.size > 0) lastId = fetched.last().id;
                fetchedOverall += fetched.size;
        
                let filtered = fetched.filter(x => x.author.id === userId);
                if (messagesDeleted + filtered.size > deleteAmount) {
                    filtered = Array.from(filtered.keys()).slice(0, deleteAmount - messagesDeleted);
                }
        
                messagesDeleted += await message.channel.bulkDelete(filtered);
            }
            while (messagesDeleted < deleteAmount && fetched.size == count && fetchedOverall < stop); 
        }
        userDel(100, args[1], message)
    }
}

module.exports.help = {
  name: "clean"
}
