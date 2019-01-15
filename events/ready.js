module.exports = client => {
    console.log(`Logged in as ${client.user.tag}!`);
    const welcome = client.channels.find(c => c.name === 'welcome');
	welcome.fetchMessages({ limit: 10 }).then(collected => console.log('Fetched ' + collected.size + ' messages.')).catch(console.error);
};