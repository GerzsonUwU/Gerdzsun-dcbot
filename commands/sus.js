module.exports = {
    name: 'sus',
    aliases: [],
    permissions: [],
    description: "Just test ping command",
    async execute(Discord, client, message, args, cmd) {
            if(!args[0]) return message.reply("<:pain:768944997898649610>");
            if(isNaN(args[0])) return message.reply("<:amongass:835739063624531998>");
            await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                message.channel.send('<:mongus1:868499573528731679>')
                // await message.channel.messages.fetch({limit: args[0]}).then(messages =>{
                //     message.channel.send('<:mongus2:868499617514393630>')
                // })

        
            });


    }
}



//message.channel.send('<:mongus2:868499617514393630>')