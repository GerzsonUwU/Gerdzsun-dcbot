const Discord = require('discord.js');
// const { REST } = require('@discordjs/rest');
// const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const intents = new Discord.Intents(32767);

const client = new Discord.Client({ intents, partials: ["MESSAGE", "CHANNEL", "RECTION"] })


client.commands = new Discord.Collection();
client.events = new Discord.Collection();

// const commands = [];

['command_handler', 'event_handler'].forEach(handler =>{
    require (`./handlers/${handler}`)(Discord, client);
})

client.on("messageCreate", message =>{
    const text = message.content.toLowerCase();
    if (text.includes("discord.gg/")) message.delete(), console.log("Deleted discord invite.")
    if (text.includes("free nitro")) message.delete(), console.log("Deleted nitro scam.")
})

// client.once("ready", () => {
//     const CLIENT_ID = client.user.id;

//     const rest = new REST({
//         version: "9"
//     }).setToken(process.env.TOKEN);

//     (async() => {
//         try {
//             if (process.env.ENV === "prodiction") {
//                 await rest.put(Routes.applicationCommands(CLIENT_ID), {
//                     body: commands
//                 });
//                 console.log("Successfully registerd commands globally.")
//             }else {
//                 await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
//                     body: commands
//                 });
//                 console.log("Successfully registerd commands locally.")
//             }
//         } catch (err) {
//             if (err) console.error(err);
//         }

//     })();
// })

client.login(process.env.DISCORD_TOKEN);
