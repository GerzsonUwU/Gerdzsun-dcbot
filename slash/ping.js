const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")
const quick = require('quick.db');

module.exports = {
	data: new SlashCommandBuilder().setName("ping")
    .setDescription("See if the bot is online and get it's ping"),
	run: async ({ client, interaction, Discord, message, args, cmd }) => {
        const ping = await getDBPingData();
        const messagePing = Date.now(); 
        const msg = await message.channel.send('Loading...');
        const endMessagePing = Date.now() - messagePing;

        const embed = new MessageEmbed()
        .setDescription(
          `
          Database ping data:
          - Fetch ping: \`${ping.endGet}ms\`
          - Wright ping: \`${ping.endWright}ms\`
          - Avrage ping: \`${ping.avarage}ms\`
          Message ping: \`${endMessagePing}ms\`
        `
        )
        .setColor('GREEN')
        .setTimestamp();
  
      msg.edit({
        content: '⠀',
        embeds: [embed],
      });
	},
}

async function getDBPingData() {
    const startGet = Date.now();
    await quick.get('QR=.');
    const endGet = Date.now() - startGet;
  
    const startWright = Date.now();
    await quick.set('QR=.', Buffer.from(startWright.toString()).toString('base64'));
    const endWright = Date.now() - startWright;
  
    // avrage ping time
    const avarage = (endGet + endWright) / 2;
    try {
      quick.delete('QR=.');
    } catch (error) {}
    return { endGet, endWright, avarage };
  }