module.exports = {
    name: "paint",
    description: "Paint every hour",
    cooldown: 600,
    args: false,
    aliases: ['p'],
    type: "Economy",
    usage: "paint",

    execute(message, args) {
        const Discord = require("discord.js");
        const Storage = require('../Library/paintstorage')

        let grant = Math.floor(Math.random() * (40 - 10) + 10);

        let hourlyPaint = async function () {

            message.channel.startTyping();

            await Storage.findOne({
                userID: message.author.id
            }, (err, store) => {
                if (err) console.log(err);

                if (!store) {
                    const newStorage = Storage({
                        userID: message.author.id,
                        paint: grant,
                        serverID: message.guild.id
                    })

                    newStorage.save().catch(err => {
                        console.log(err)
                    })

                } else {
                    store.paint = store.paint + grant
                    store.save().catch(err => {
                        console.log(err)
                    })
                }

                message.channel.stopTyping();

                let hourlyEmbed = new Discord.MessageEmbed()
                    .setColor("BLURPLE")
                    .setFooter(`You have accumulated ${grant}ml of paint`, 'https://i.imgur.com/0pKEDL2.png')

                message.channel.send(hourlyEmbed);


            })



        }

        hourlyPaint();



    }
};