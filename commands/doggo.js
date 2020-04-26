const { RichEmbed } = require('discord.js');
const fetch = require('node-fetch');

exports.run = async (client, message, args) => {

    let doggo = await fetch('https://dog.ceo/api/breeds/image/random')
        .then(res => res.json())
        .then(json => json.message);

    // anthony#8577
    let embed = new RichEmbed()
        .setAuthor(message.member.user.tag, message.member.user.avatarURL)
        .setColor(0xdd2423)
        .setImage(doggo)
        .setThumbnail(message.guild.iconURL)
        .setFooter(`A random doggo!!`)
        .setTimestamp();

    message.channel.send(embed);

};

exports.help = {
    name: 'doggo'
};