module.exports = async (client, message) => {

    if (!message.guild) return;

    let settings;
    try {
        settings = await client.getGuild(message.guild);
    } catch (error) {
        console.error(error);
    }

    if (message.author.bot) return;
    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args, settings);
};