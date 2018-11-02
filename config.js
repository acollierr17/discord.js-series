require('dotenv-flow').config();

module.exports = {
    token: process.env.token,
    owner: process.env.OWNER,
    prefix: process.env.PREFIX
};