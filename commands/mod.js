module.exports = {
    name: 'mod',
    aliases: [],
    permissions: [],
    description: "Tests if you have mod permission",
    execute(Discord, client, message, args, cmd){
        
        if(message.member.roles.cache.has('507106760427962368')){
            message.channel.send('Moderátor vagy Pog');


        } else {
            message.channel.send('Nem vagy moderátor Sadge');
        }
    
        
    
    }
}