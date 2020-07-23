module.exports = {
    name: "storage",
    description: "View your paint",
    cooldown: 5,
    args: false,
    aliases: ["s", "bal"],
    type: "Economy",
    usage: "bal <user>",

    execute(message, args) {

        const Discord = require("discord.js");
        const PaintStorage = require("../Library/paintstorage");

        message.channel.startTyping();

        let paintEmbed = new Discord.MessageEmbed()
            .setColor("BLURPLE")

        if (args.length === 0) { // Get your own balance
            var findID = message.author.id;

        } else if (args.length === 1) { // Get another members balance
            let paintUser = message.mentions.users.first();
            if (!paintUser) message.channel.send("Tagged user not found")

            findID = paintUser.id;
        }

        let storage = async function () {
            if (args.length < 2) {
                await PaintStorage.findOne({
                        userID: findID,
                    },
                    (err, res) => {
                        if (err) return console.log(err);

                        if (!res) {
                            paintEmbed.setFooter(
                                "Couldn't find anything here, much emptiness", 'https://i.imgur.com/bQN25fW.png'
                            );
                            paintEmbed.setColor('BLURPLE')
                        } else {
                            paintEmbed.setFooter(`You currently have ${res.paint}ml of paint stored`, 'https://i.imgur.com/bQN25fW.png');
                        }

                        message.channel.stopTyping()

                        message.channel.send(paintEmbed);
                    }
                );
            }
        };

        storage();
    }
};