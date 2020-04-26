module.exports = async (client, message) => {

    if (!message.guild) return;

    let settings;
    try {
        settings = await client.getGuild(message.guild);
    } catch (error) {
        console.error(error);
    }

    if (message.author.bot) return;

    /**
     * COIN SYSTEM
     * 
     * The threshold is going to be quite low for the tutorial. However, one may want to lower this thesrold. 
     * 
     * [x] For every x messages (between 2 - 5 messages) by the user, issue coins to user
     * [x] Issue x amount of coins to user (between 1 - 5 coins)
     * [x] Get the current amount of coins the user has, add the issued amount of coins to the user
     * [x] Update the current amount of coins the user has in the database
     * 
     * Make sure to remove the console.log() statements before moving on. They're only there for development purposes
     */

    const messageCheck = Math.floor((Math.random() * 10)) + 1;
    const coinAmount = Math.floor((Math.random() * 4)) + 1;
    console.log('messageCheck', messageCheck, 'coinCheck', coinAmount);

    if (messageCheck >= 2 && messageCheck <= 5) {
        try {
            await updateCoins(client, message.member, coinAmount);
        } catch (err) {
            console.error(err);
        }
    }

    if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);
    if (!cmd) return;

    cmd.run(client, message, args, settings);
};

async function updateCoins(client, member, amount) {
    const newProfile = {
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag
    };

    const profile = await client.getProfile(member);
    if (!profile) await client.createProfile(newProfile);
    const newAmount = profile ? profile.coins + amount : amount;
    await client.updateProfile(member, { coins: newAmount });
    console.log(`Updated: ${newAmount}`);
}