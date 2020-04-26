exports.run = async (client, message, args) => {

    if (message.author.id !== client.config.owner) return;

    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
 
      message.channel.send(client.clean(evaled), {code:"js"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${client.clean(err)}\n\`\`\``);
    }
};

exports.help = {
    name: 'eval'
};