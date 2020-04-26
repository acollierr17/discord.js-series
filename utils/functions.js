const mongoose = require('mongoose');
const { Guild, Profile } = require('../models');

module.exports = client => {

    client.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if (data) return data;
        else return client.config.defaultSettings;
    };

    client.updateGuild = async (guild, settings) => {
        let data = await client.getGuild(guild);

        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
            else return;
        }

        console.log(`Guild "${data.guildName}" updated settings: ${Object.keys(settings)}`);
        return await data.updateOne(settings);
    };

    client.createGuild = async settings => {
        const defaults = Object.assign({ _id: mongoose.Types.ObjectId() }, client.config.defaultSettings);
        const merged = Object.assign(defaults, settings);

        const newGuild = await new Guild(merged);
        return newGuild.save()
            .then(console.log(`Default settings saved for guild "${merged.guildName}" (${merged.guildID})`));
    };

    client.createProfile = async profile => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, profile);

        const newProfile = await new Profile(merged);
        return newProfile.save()
            .then(console.log(`New profile saved for user "${merged.username}" (${merged.userID})`));
    };

    client.getProfile = async user => {
        const data = await Profile.findOne({ userID: user.id });
        if (data) return data;
        else return;
    };

    client.updateProfile = async (user, data) => {
        let profile = await client.getProfile(user);

        if (typeof profile !== 'object') profile = {};
        for (const key in data) {
            if (profile[key] !== data[key]) profile[key] = data[key];
            else return;
        }

        console.log(`Profile "${profile.username}" (${profile.userID}) updated: ${Object.keys(data)}`);
        return await profile.updateOne(profile); 
    };

    client.clean = text => {
        if (typeof(text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    };
};