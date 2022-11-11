const ms =  require('ms')
module.exports = {
    name: 'mute',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    description: "Mutolhatsz embereket",
    execute(Discord, client, message, args, cmd){ //Discord, client, message
        const target = message.mentions.users.first();
        if(target){
            let mainRole = message.guild.roles.cache.find(role => role.name === 'NAGY KUKI');
            let mutedRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget = message.guild.members.cache.get(target.id);


            if(!args[1]){
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(mutedRole.id);
                const mute = new Discord.MessageEmbed()
                .setColor('#3498db')
                .setTitle('Mute')
                .setDescription(`A <@${memberTarget.user.id}> mutolva lett.`)
                message.channel.send({ embeds: [mute] })
                return
    
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(mutedRole.id);
            const mute = new Discord.MessageEmbed()
            .setColor('#3498db')
            .setTitle('Mute')
            .setDescription(`A <@${memberTarget.user.id}> mutolva lett ${ms(ms(args[1]))}.`)
            message.channel.send({ embeds: [mute] })

            setTimeout(function () {
                memberTarget.roles.remove(mutedRole.id);
                memberTarget.roles.add(mainRole.id);
                const unmute = new Discord.MessageEmbed()
                .setColor('#3498db')
                .setTitle('Mute')
                .setDescription(`A <@${memberTarget.user.id}> unmutolva lett.`)
                message.channel.send({ embeds: [unmute] })               
            }, ms(args[1]));
        } else{
            message.channel.send('Kit is akarsz mutulni?')
        }
    }
}