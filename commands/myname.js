exports.run = (client, message, args) => {

    const name = message.member.displayName;
    message.delete();
    message.channel.send(`Your name is ${name}.`);

};

exports.help = {
    name: 'myname'
};