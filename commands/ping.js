exports.run = (client, message, args) => {
    message.channel.send('Pong!').catch(console.error);
};

exports.help = {
    name: 'ping'
};