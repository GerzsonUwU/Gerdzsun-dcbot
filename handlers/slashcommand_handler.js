const fs = require('fs');
console.log('asd');

const LOAD_SLASH = process.argv[2] == "load"

module.exports = (Discord, client) => {
    let commands = [];

    const slashFiles = fs.readdirSync("./slash").filter(file => file.endsWith(".js"))
    for (const file of slashFiles){
        const slashcmd = require(`./slash/${file}`)
        client.slashcommands.set(slashcmd.data.name, slashcmd)
        if (LOAD_SLASH) commands.push(slashcmd.data.toJSON())
    }

    if (LOAD_SLASH) {
        const rest = new REST({ version: "9" }).setToken(TOKEN)
        console.log("Deploying slash commands")
        rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {body: commands})
        .then(() => {
            console.log("Successfully loaded")
            process.exit(0)
        })
        .catch((err) => {
            if (err){
                console.log(err)
                process.exit(1)
            }
        })
    }
    else {
        client.on("ready", () => {
            console.log(`Logged in as ${client.user.tag}`)
        })
        client.on("interactionCreate", (interaction) => {
            async function handleCommand() {
                if (!interaction.isCommand()) return

                const slashcmd = client.slashcommands.get(interaction.commandName)
                if (!slashcmd) interaction.reply("Not a valid slash command")

                await interaction.deferReply()
                await slashcmd.run({ client, interaction })
            }
            handleCommand()
        })
        client.login(TOKEN)
    }
}

