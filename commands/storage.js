module.exports = {
    name: "storage",
    description: "View your paint",
    cooldown: 10,
    args: false,
    aliases: ["s", "bal"],
    type: "stats",
    usage: "bal <user>",

    execute(message, args) {
        const Discord = require("discord.js");
        const PaintStorage = require("../Library/paintstorage");

        let paintEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setFooter("Stay active to level up", message.client.avatarURL);

        if (args.length === 0) { // Get your own balance
            var findID = message.author.id;

            paintEmbed.setThumbnail(message.author.avatarURL);
            paintEmbed.setTitle(message.author.username);

        } else if (args.length === 1) { // Get another members balance
            let paintUser = message.mentions.users.first();
            if (!paintUser) message.channel.send("Tagged user not found")

            paintEmbed.setThumbnail(paintUser.avatarURL);
            paintEmbed.setTitle(paintUser.username);

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
                            paintEmbed.setDescription(
                                "Couldn't find anything here \n\n **Emptiness**" //  --> Member hasn't sent a  message (0 credits)
                            );
                        } else {
                            paintEmbed.setDescription(
                                " Total paint acquired: " + `\n\n**${res.paint}**` + " litres of paint"
                            );
                        }
                        message.channel.send(paintEmbed);
                    }
                );
            }
        };

        storage();
    }
};