const paint = require("./paint");

module.exports = {
    name: "top",
    description: "Shows the top 10 paint collectors!",
    cooldown: 5,
    args: false,
    type: "Economy",
    usage: "top",
    aliases: ['lb'],

    execute(message, args) {

        const Discord = require("discord.js");
        const Storage = require("../Library/paintstorage");

        let top = async function () {

            await Storage.find({
                serverID: message.guild.id
            }).sort([
                ['paint', 'descending']
            ]).exec((err, res) => {
                if (err) console.log(err);

                let topembed = new Discord.MessageEmbed()
                    .setTitle('~ Paint Collectors ~')
                    .setColor('BLURPLE')


                if (res.length == 0) {

                    topembed.setColor('RED')
                    topembed.setDescription('No one has obtained any paint yet')

                    return message.channel.send(topembed)

                }


                if (res.length < 10) {

                    for (i = 0; i < res.length; i++) {

                        let member = message.guild.members.cache.get(res[i].userID) || "Member Left"
                        if (member == "Member left") {
                            topembed.addField(`${i + 1}. ${member}`, `**Paint**: ${res[i].paint}`)
                        } else {
                            topembed.addField(`${i + 1}. ${member.user.username}`, `**Paint**: ${res[i].paint}`)
                        }

                    }

                    message.channel.send(topembed);

                } else {

                    for (i = 0; i < 10; i++) {

                        let member = message.guild.members.cache.get(res[i].userID) || "Member Left"
                        if (member == "Member left") {
                            topembed.addField(`${i + 1}. ${member}`, `**Paint**: ${res[i].paint}`)
                        } else {
                            topembed.addField(`${i + 1}. ${member.user.username}`, `**Paint**: ${res[i].paint}`)
                        }

                    }


                }

            })



        }

        top();







    }
};