const { RichEmbed } = require("discord.js");
exports.run = async (client, message, args, settings) => {

    if (!message.member.hasPermission('ADMINISTRATOR')) return;

    let setting = args[0];
    let updated = args.slice(1).join(' ');

    switch (setting) {
        case 'prefix': {
            if (updated) {
                try {
                    await client.updateGuild(message.guild, { prefix: updated });
                    return message.channel.send(`Prefix has been updated to: \`${updated}\``);
                } catch (error) {
                    console.error(error);
                    message.channel.send(`An error occurred: **${error.message}**`);
                }
            }

            message.channel.send(`Current prefix: \`${settings.prefix}\``);
            break;
        }
        case 'welcomeChannel': {
        if (updated) {
            const channel = message.mentions.channels.first();
            if (!channel) {
                message.channel.send(`Please mention a channel!`);
                break;
            }
            try {
                await client.updateGuild(message.guild, {
                    welcomeChannel: channel.name,
                });
            }
            catch(error) {
                message.channel.send(`An error has occurred: **${error.message}**`);
                break;
            }
        }
            message.channel.send(`Current welcome channel: \`${settings.welcomeChannel}\``);
            break;
        }
        case 'welcomeMsg': {
            if (updated) {
                try {
                    const userReg = /\{\{user\}\}/gi;
                    const guildReg = /\{\{guild\}\}/gi;
                    if (!userReg.test(updated) || !guildReg.test(updated)) {
                        message.channel.send(
                            !userReg.test(updated) && guildReg.test(updated) ? "Please specify the {{user}} variable!" : 
                            !guildReg.test(updated) && userReg.test(updated) ? "Please specify the {{guild}} variable!" :
                            "Please specify the {{guild}} variable and the {{user}} variable!"
                        );
                        break;
                    }
                    await client.updateGuild(message.guild, {
                        welcomeMsg: updated,
                    });
                }
                catch (err) {
                    message.channel.send(`An error has occurred: **${err.message}**`);
                    break;
                }
            }
            break;
        }
        case 'modRole': {
            if (updated) {
                const modRole = message.mentions.roles.first();
                if (!modRole) {
                    message.channel.send("Please mention a role!");
                    break;
                }
                try {
                    await client.updateGuild(message.guild, {
                        modRole: modRole.name
                    });
                }
                catch (err) {
                    message.channel.send(`An error has occurred: **${err.message}**`);
                    break;
                }
            }
            message.channel.send(`Current Mod Role ${settings.modRole}`);
            break;
        }
        case 'adminRole': {
            if (updated) {
                const adminRole = message.mentions.roles.first();
                if (!adminRole) {
                    message.channel.send("Please mention a role!");
                    break;
                }
                try {
                    await client.updateGuild(message.guild, {
                        adminRole: adminRole.name
                    });
                }
                catch (err) {
                    message.channel.send(`An error has occurred: **${err.message}**`);
                    break;
                }
            }
            message.channel.send(`Current Mod Role ${settings.adminRole}`);
            break;
        }
        default: {
            try {
                let arr = [];
                Object.keys(settings).forEach((setting) => {
                    arr.push(`${setting}: \`${settings[setting]}\``);
                });
                const embed = new RichEmbed()
                    .setTitle("Current Server Settings")
                    .setDescription(arr.join('\n'));
                message.channel.send(embed);
                }
            catch (err) {
                message.channel.send(`An error occurred: **${err.message}**`);
            }
            break;
        }
    }
};

exports.help = {
    name: 'config'
};