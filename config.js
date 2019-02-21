require('dotenv-flow').config();

module.exports = {
    owner: process.env.OWNER,
    prefix: process.env.PREFIX,
    defaultSettings: {
        prefix: process.env.PREFIX,
        welcomeChannel: '',
        welcomeMsg: '',
        modRole: '',
        adminRole: ''
    }
};