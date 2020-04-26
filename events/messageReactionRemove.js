module.exports = async (client, messageReaction, user) => {

    const message = messageReaction.message;
    const channel = message.guild.channels.find(c => c.name === 'welcome');
    const member = message.guild.members.get(user.id);
    if (member.user.bot) return;

    const a = message.guild.roles.get('485987998794514442'); // Moderator
    const b = message.guild.roles.get('485987998165499914'); // Administrator
    const c = message.guild.roles.get('482192667766423561'); // Developer

    if (['🇦', '🇧', '🇨'].includes(messageReaction.emoji.name) && message.channel.id === channel.id) {
        switch (messageReaction.emoji.name) {
            case '🇦':
                member.removeRole(a).catch(console.error);
                break;
            case '🇧':
                member.removeRole(b).catch(console.error);
                break;
            case '🇨':
                member.removeRole(c).catch(console.error);
                break;
            default:
                break;
        }
    }
};