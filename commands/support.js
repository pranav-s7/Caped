module.exports = {
    name: "support",
    description: "To report bugs or further help for Caped",
    cooldown: 5,
    args: false,
    type: "Assistance",
    usage: "support",

    execute(message, args) {
        const Discord = require("discord.js");

        let support = new Discord.MessageEmbed()
            .setColor('BLURPLE')
            .addField("**~ Support or Suggestions ~**", "Join the support server for Caped! [Click here](https://discord.gg/xyAaUXu)")

        message.channel.send(support)



    }
};