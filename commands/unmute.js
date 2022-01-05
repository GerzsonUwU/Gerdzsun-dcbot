module.exports = {
    name: 'unmute',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Unmutolhatsz embereket",
    execute(Discord, client, message, args, cmd){
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'member');
            let mutedRole = message.guild.roles.cache.find(role => role.name === 'muted');

            let memberTarget = message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(mutedRole.id);
            memberTarget.roles.add(mainRole.id);
            const unmute = new Discord.MessageEmbed()
            .setColor('#3498db')
            .setTitle('Unmute')
            .setDescription(`A <@${memberTarget.user.id}> unmutolva lett.`)
            message.channel.send(unmute);
        } else{
            message.channel.send('Kit is akarsz unmutoli?')
        }
    }
}