module.exports = {
    name: 'ban',
    aliases: [],
    permissions: ["ADMINISTRATOR", "BAN_MEMBERS"],
    description: "Bannolhatsz idegesítő embereket",
    async execute(Discord, client, message, args, cmd){
        const member = message.mentions.users.first();
        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.ban();
            const ban = new Discord.MessageEmbed()
            .setColor('#FF0000')
            .setTitle('Bann')
            .setDescription('A kijelölt felhasználó bannolva lett.')
            .setImage('https://media2.giphy.com/media/H99r2HtnYs492/giphy.gif')
            message.channel.send(ban);
        }else{
            message.channel.send('Kit is akarsz bannolni?');
        }
    }
}