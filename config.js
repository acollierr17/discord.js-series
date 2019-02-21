require('dotenv-flow').config();

module.exports = {
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    mongoURI: process.env.MONGO_URI,
    defaultSettings: {
        prefix: process.env.PREFIX,
        welcomeChannel: 'welcome',
        welcomeMsg: 'Welcome {{user}} to {{guild}}!',
        modRole: 'Moderator',
        adminRole: 'Administrator'
    }
};