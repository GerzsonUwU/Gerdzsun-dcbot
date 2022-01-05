const fs = require("fs")
const moment = require("moment");

module.exports = {
    name: 'address.add',
    aliases: [],
    permissions: [],
    description: "Add wl adress",
    execute(Discord, client, message, args, cmd){
        const adress = args[0]
        if (!message.member.roles.cache.some(role => role.name === 'Whitelist')) return message.reply(`You need Whitelist role to add an address, check <#926032001037914222> !`);
        if (!adress) return message.reply("You need to provide an address!");
        if (!adress.startsWith("0x")) return message.reply("You entered an invalid address!");
        if (adress.length !== 42) return message.reply("You entered an invalid address!")

        fs.appendFile('logger.txt', `${message.author.username + '#' + message.author.discriminator} : ${adress + '\n'}`, (err) => {
          if (err) throw err;
        });
        fs.appendFile('WL.txt',`${adress + '\n'}`, (err) => {
            if (err) throw err;
          });

        message.reply("Address was added succesfully!")
    }
}