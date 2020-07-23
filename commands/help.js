module.exports = {
    name: "help",
    description: "View commands and how to use them",
    cooldown: 5,
    aliases: ['commands'],
    type: "Assistance",
    usage: "help <command>",

    execute(message, args) {
        const Discord = require("discord.js");
        const prefix = "cc";

        let {
            commands
        } = message.client;

        if (!args.length) {

            sortedcmds = commands.reduce((res, command) => {
                if (!res[command.type]) res[command.type] = [];
                res[command.type].push(command.name);
                return res;
            }, {});

            let helpEmbed = new Discord.MessageEmbed()

            for (let [key, value] of Object.entries(sortedcmds)) {
                helpEmbed.addField(key, value.map(cmd => `\`${cmd}\``).join(" "));
            }

            helpEmbed.setTitle("List of Available Commands!");
            helpEmbed.setDescription(`cc help [command name] for detailed info`);
            helpEmbed.setColor("BLURPLE");

            return message.channel.send(helpEmbed);
        }

        let helpCommand = args[0].toLowerCase();
        const command = commands.get(helpCommand) || commands.find(c => c.aliases && c.aliases.includes(helpCommand))

        if (!command) {
            let inalid = new Discord.MessageEmbed()
                .setColor('BLURPLE')
                .addField("**~ Command Not Found ~**", "Join the support server for Caped! [Click here](https://discord.gg/xyAaUXu)")
            return message.channel.send(invalid)
        }

        let specific = new Discord.MessageEmbed()
            .setColor('BLURPLE')
            .setTitle(`Command: ${command.name}`)
            .setDescription(command.description);

        if (command.aliases) {
            specific.setFooter(
                `Aliases: ${command.aliases.join(", ")}`,
                message.author.avatarURL
            );
        } else specific.setFooter("Aliases: None", message.author.avatarURL);

        if (command.usage) specific.addField("Usage", prefix + " " +
            command.usage);

        message.channel.send(specific); // --> Help on a specific command 





    }
};