module.exports = {
    name: 'admin',
    aliases: [],
    permissions: [],
    description: "Checks if you have admin permission",
    execute(Discord, client, message, args, cmd){
        
        if(message.member.permissions.has("ADMINISTRATOR")){
            message.channel.send('Administrátor vagy Monkas')
        } else {
            message.channel.send('Nem vagy administrátor Sadge')
        }
    }
}