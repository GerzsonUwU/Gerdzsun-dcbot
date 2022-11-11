module.exports = {
    name: 'discornecter',
    aliases: ['dsc'], 
    permissions: [],   
    description: 'Very annoyig if you are targeted',
    async execute(Discord, client, message, args, cmd){
        var server = servers[msg.guild.id];
        const csábó = args[0]
        msg.guild.voiceConnection.disconnect(csábó);
    }

}