const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv-flow').config();

// I kept the config.json file even though I will be using .env for the rest of the series
// only so you can see and know the differnce.

const config = {
    token: process.env.TOKEN,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
};

const prefix = config.prefix;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// [!!mute @User 12h Posting too many good memes]
// 0        1     2      3     5   6    7   8   
// !!mute <user> <time> <reason> \

client.on('message', message => {
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping': {
            message.channel.send('Pong!').catch(console.error);
            break;
        }
        case 'myname': {
            const name = message.member.displayName;
            message.delete();
            message.channel.send(`Your name is ${name}.`);
            break;
        }
        case 'say': {
            // !!say My name is Jeff
            const response = args.join(' ');
            message.delete();
            message.channel.send(response);
            break;
        }
        default:
            message.channel.send('This command is unknown!');
            break;
    }
});

client.login(config.token);