const countGame = new Set();

exports.run = async (client, message, args) => {

    const { prefix } = client.config;

    let cmdName = client.commands.get('count', 'help.name');

    let num = parseInt(args[0]);
    if (!num) return message.channel.send(`Usage: \`${prefix + cmdName} <num>\``);

    // If a game doesn't exist, add user to the Set and send message that a new game started
    if (countGame.size === 0) {
        if (num !== 1) return message.channel.send(`The game must start at **1**!`);
        await countGame.add(message.author.id);
        return message.channel.send(`**${message.member.user.tag}** has started a game! Current count is at **${countGame.size}**.`);
    // Is user enters incorrect number, end the game (clear the Set)
    } else if (num !== countGame.size + 1) {
        countGame.clear();
        return message.channel.send(`:frowning: **${message.member.user.tag}** has ended the game by entering **${num}**.`);
    // If a game is ongoing, add user to the Set
    } else {
        await countGame.add(message.author.id);
        return message.channel.send(`**${message.member.user.tag}** has counted! Game is now at **${countGame.size}**.`);
    }

};

exports.help = {
    name: 'count'
};