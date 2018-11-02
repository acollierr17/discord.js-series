const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {

    let meow = await fetch('http://aws.random.cat/meow')
        .then(res => res.json())
        .then(json => json.file);

    // anthony#8577
    let embed = new RichEmbed()
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setColor(0xdd9323)
        .setImage(meow);

    message.channel.send(embed);

};

exports.help = {
    name: 'meow'
};