module.exports = {
    name: "steal",
    description: "Will you give them the L or take it for yourself?",
    cooldown: 1800,
    args: true,
    type: "Economy",
    usage: "steal <@user>",

    execute(message, args) {
        const Discord = require("discord.js");
        const Storage = require('../Library/paintstorage')

        let steal = async function () {

            let stealembed = new Discord.MessageEmbed()
                .setColor('BLURPLE')

            Storage.findOne({
                userID: message.author.id
            }, (err, res) => {
                if (err) console.log(err)

                let target = message.mentions.users.first()

                if (!res || res.paint < 100) {
                    stealembed.setColor('BLURPLE')
                    stealembed.setFooter('Minimum requirement is 100ml of paint to rob', 'https://i.imgur.com/bZsRht3.png')

                    return message.channel.send(stealembed);
                }

                if (!target) {
                    stealembed.setColor('BLURPLE')
                    stealembed.setFooter('Invalid user mentioned cc help steal', 'https://i.imgur.com/bZsRht3.png')

                    return message.channel.send(stealembed);
                }

                Storage.findOne({
                    userID: target.id
                }, (err, tres) => {
                    if (err) console.log(err);

                    if (!tres || tres.paint < 100) {
                        stealembed.setColor('BLURPLE')
                        stealembed.setFooter('Targeted user does not have 100ml of paint', 'https://i.imgur.com/bZsRht3.png')

                        return message.channel.send(stealembed)
                    }

                    if (tres.userID == res.userID) {
                        stealembed.setColor('BLURPLE')
                        stealembed.setFooter('You cannot rob yourself', 'https://i.imgur.com/bZsRht3.png')

                        return message.channel.send(stealembed)

                    }

                    let successrate = Math.floor(Math.random() * 10) + 1

                    let decision;

                    if (successrate < 4) decision = true
                    if (successrate > 5) decision = false

                    let percentsteal = Math.floor(Math.random() * 10) + 5

                    if (decision) {

                        res.paint += Math.floor(tres.paint * (percentsteal / 100))
                        res.save().catch(err => {
                            console.log(err)
                        })

                        tres.paint -= Math.floor(tres.paint * (percentsteal / 100))
                        tres.save().catch(err => {
                            console.log(err)
                        })

                        stealembed.setFooter(`${message.author.username} has stolen a whoopin' ${Math.floor(tres.paint * (percentsteal / 100))}ml from ${target.username}!`, 'https://i.imgur.com/bZsRht3.png')

                    } else {

                        res.paint -= Math.floor(res.paint * (percentsteal / 100))
                        res.save().catch(err => {
                            console.log(err)
                        })

                        tres.paint += Math.floor(res.paint * (percentsteal / 100))
                        tres.save().catch(err => {
                            console.log(err)
                        })

                        stealembed.setFooter(`${message.author.username} has failed the robbery and lost ${Math.floor(tres.paint * (percentsteal / 100))}ml to  ${target.username}!`, 'https://i.imgur.com/bZsRht3.png')


                    }

                    return message.channel.send(stealembed)


                })

            })

        }

        steal()

    }
};