const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const Users = require('./models/users.js');
const mongoose = require('mongoose');

mongoose.connect(config.mongoodb, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('mongoose running...'))

client.on('ready', () => {
    console.log('onpy is running...')
    client.user.setActivity(config.status);
});

client.on("message", (message) => {

    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === "reg") {
        let age = args[0];
        let sex = args[1];
        let work = args[2];

        const regiser = new Users({
            username: message.author.username,
            userdiscriminator: message.author.discriminator,
            userage: age,
            usersex: sex,
            userprof: work,
            useravatar: message.author.avatarURL()
        });

        if (age > 18) {
            let role = message.guild.roles.cache.find(r => r.name === "+18");
            message.member.roles.add(role);
        }

        if (age < 18) {
            let role = message.guild.roles.cache.find(r => r.name === "-18");
            message.member.roles.add(role);
        }

        if (sex === "masculino") {
            let role = message.guild.roles.cache.find(r => r.name === "_masculino");
            message.member.roles.add(role);
        }

        if (work === "programador") {
            let role = message.guild.roles.cache.find(r => r.name === "_programador");
            message.member.roles.add(role);
        }

        regiser.save()
            .then(result => console.log({ result }))
            .catch(err => console.log(err));

        const embed = new Discord.MessageEmbed()
            .setTitle(`Olá, ${message.author.username} você foi registrado`)
            .setColor(0x00AE86)
            .setDescription(`${message.author.username}, **${age}y**, **${sex}**, trabalha como **${work}**`)

        message.channel.send(embed)
            .then(message => setTimeout(() => message.delete(), 9000));
    }

    if (command === "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`<:uvinha:677508804899766282> Olá, ${message.author.username} pelo visto você não tem permissão para usar esse comando!`)
            .then(message => setTimeout(() => message.delete(), 2000));

        var limit = 200
        if (args.length === 1) {
            limit = parseInt(args[0])
        } else {
            return message.channel.send(`<:uvinha:677508804899766282> Olá, ${message.author.username} determine uma quantidade de mensagens para serem **excluídas**.`)
                .then(message => setTimeout(() => message.delete(), 2000));
        }

        if (!Number.isInteger(limit)) return message.channel.send(`<:uvinha:677508804899766282> Olá, ${message.author.username} determine uma valor **numerico**.`)
            .then(message => setTimeout(() => message.delete(), 2000));
        limit = Math.min(limit, 99)

        message.channel.bulkDelete(limit)
            .then(messages => {
                message.reply(`acabar de **deletar** ${messages.size} mensagens`)
                    .then(message => setTimeout(() => message.delete(), 2000))
            })
    }

});

client.login(config.token);