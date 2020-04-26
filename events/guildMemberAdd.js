module.exports = async (client, member) => {

    let userLogs = member.guild.channels.find(c => c.name === 'user_logs');
    const newProfile = {
        guildID: member.guild.id,
        guildName: member.guild.name,
        userID: member.id,
        username: member.user.tag
    };
    
    try {
        await client.createProfile(newProfile);
    } catch (err) {
        console.error(err);
    }

    // anthony#8577
    userLogs.send(`${member.user.tag} has joined **${member.guild}**!`);

};