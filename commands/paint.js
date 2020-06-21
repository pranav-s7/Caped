module.exports = {
    name: "paint",
    description: "Paint every hour",
    cooldown: 3600,
    args: false,
    aliases: ['p'],
    type: "economy",
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
                        paint: grant
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
            })

            let store1 = await Storage.findOne({
                userID: message.author.id
            })

            message.channel.stopTyping();

            let hourlyEmbed = new Discord.MessageEmbed()
                .setTitle("Caped Paint")
                .setColor("BLUE")
                .setDescription(`You have accumulated **${grant}ml** of paint`)
                .addField(`Paint Storage:`, `You have **${store1.paint}ml** of paint`)
                .setFooter("CapedCafe#7429")

            message.channel.send(hourlyEmbed);

        }

        hourlyPaint();



    }
};