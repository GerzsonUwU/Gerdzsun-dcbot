const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const filter = i => i.customId === 'primary' && i.user.id === '122157285790187530';

module.exports = {
	data: new SlashCommandBuilder().setName("info").setDescription("Displays info about the currently playing song"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("There are no songs in the queue")

		let bar = queue.createProgressBar({
			queue: false,
			length: 19,
		})

        const song = queue.current

		await interaction.editReply({
			embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`Currently Playing [${song.title}](${song.url})\n\n` + bar)

        ],
		components: [new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setCustomId('back')
				.setStyle('PRIMARY')
				.setEmoji('⏮️')
			)
			.addComponents(
				new MessageButton()
				.setCustomId('pause')
				.setStyle('PRIMARY')
				.setEmoji('⏸️')
			)
			.addComponents(
				new MessageButton()
				.setCustomId('skip')
				.setStyle('PRIMARY')
				.setEmoji('⏭️')
			)
		]
		})

		if(interaction.isButton()){
			console.log('asd');
			interaction.reply({content: `${interaction.user.tag} clicked me!`})
		}
	},
}