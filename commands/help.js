module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    description: "This command tells you all the other commands",
    execute(Discord, client, message, args, cmd){
        const Help = new Discord.MessageEmbed()
        .setColor('#FBA918')
        .setAuthor({ name: 'Spark bot - Command List', iconURL: 'https://i.imgur.com/S2Hhyiu.png', url: 'https://www.youtube.com/watch?v=FDxkNmK0djg' })
        .setDescription(`Prefix is set to **${process.env.PREFIX}**`)
        .addFields(
            {name: 'play', value: 'Játszhatsz very uwu waw zenéket'},
            {name: 'ban', value: 'Kibannolhatod tunyhalat', inline: true },
            {name: 'kick', value: 'Kickelehetd tunyhalats'},
            {name: 'ping', value: 'Test that the bot is online!'},
        )
        
        message.channel.send({ embeds: [Help] })

    }
}