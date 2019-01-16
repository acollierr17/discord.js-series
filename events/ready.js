module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    const welcome = client.channels.find(c => c.name === 'welcome');
    const verify = client.channels.find(c => c.name === 'verify');

    const fetchedMessages = [welcome, verify];
    fetchedMessages.forEach(c => {
        c.fetchMessages({ limit: 10 }).then(collected => console.log(`Fetched ${collected.size} messages in ${c.name}.`)).catch(console.error);
    });
};