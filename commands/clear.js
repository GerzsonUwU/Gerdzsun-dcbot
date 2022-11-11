module.exports = {
    name: 'clear',
    aliases: ['cls'],
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],    
    description: "You can clear messages with this command",
    async execute(Discord, client, message, args, cmd) {
            if(!args[0]) return message.reply("add meg, hogy mennyi üzenetet akarsz kitörölni!");
            if(isNaN(args[0])) return message.reply("egy számot adj meg te buta!");

            if(args[0] > 200) return message.reply("nem törölhetsz 200-nál több üzenetet");
            if(args[0] < 1) return message.reply("most akarsz üzenetet törölni vagy sem?");

            const arg = parseInt(args[0])
            const num = arg + 1
            await message.channel.messages.fetch({limit: num}).then(messages =>{
            message.channel.bulkDelete(messages)
            
        });
    }
}       

