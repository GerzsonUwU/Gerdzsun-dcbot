const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
import fetch from "node-fetch";

module.exports = {
	data: new SlashCommandBuilder()
    .setName("valorant")
    .setDescription("Get valorant deatails like: Whats in your shop.")
    .addSubcommand((subcommand) =>
        subcommand.setName("shop")
        .setDescription("Get valorant shop.")
        .addStringOption((option) => option.setName("username").setDescription("Name displayed in valorant.").setRequired(true))
        .addBooleanOption((option) => option.setName("id").setDescription("Your id in valorant. (only the nubers no #)").setRequired(true))

    ),
	run: async ({ client, interaction }) => {
        if (interaction.options.getSubcommand() === "shop") {
            fetch('https://pd.na.a.pvp.net/store/v2/storefront/a998fba3-2dff-54e7-a0b1-cd7eae89ad9e', {
                method: 'GET'
            }).then(response => response.json())
            .then(response => console.log(JSON.stringify(response)))
        }
    }

}