module.exports = {
    name: 'kick',
    aliases: [],
    permissions: ["ADMINISTRATOR", "KICK_MEMBERS"],
    description: "Kickelhetsz idegesítő embereket",
    async execute(Discord, client, message, args, cmd){
        const member = message.mentions.users.first();
        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.kick();
            const kick = new Discord.MessageEmbed()
            .setColor('#3498db')
            .setTitle('Kick')
            .setDescription('A kijelölt felhasználó kickelve lett.')
            message.channel.send({ embeds: [kick] })
        }else{
            message.channel.send('Kit is akarsz kickelni?');
        }
    }
}