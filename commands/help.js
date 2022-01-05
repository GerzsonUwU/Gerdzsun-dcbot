module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    description: "This command tells you all the other commands",
    execute(Discord, client, message, args, cmd){
        const Help = new Discord.MessageEmbed()
        .setColor('#FBA918')
        .setAuthor({ name: 'Spark bot - Command List', iconURL: 'https://pbs.twimg.com/profile_images/1478092319303905286/-wCDCGL4_400x400.jpg', url: 'https://aron-molnar-megyeri.gitbook.io/spark-dao-docs/' })
        .setDescription(`Prefix is set to **${process.env.PREFIX}**`)
        .addFields(
            {name: 'adress.add', value: 'Add your address to the WL list.'},
            {name: '**Plase doubele check that you entered the correct adress!**', value: '⠀', inline: true },
            {name: 'ticket', value: 'Create a ticket, where you can ask for help!'},
            {name: 'ping', value: 'Test that the bot is online!'},
        )
        
        message.channel.send({ embeds: [Help] })

    }
}