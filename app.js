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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});

client.login(config.token);