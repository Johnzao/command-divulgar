const { MessageEmbed } = require("discord.js");
const axios = require("axios")

module.exports = class Divulgar {
    constructor(client) {
        this.client = client;
        this.name = "divulgar";
        this.aliases = [];

        this.ownerOnly = false;
    }

    async run({ message, args, prefix }) {
        try {
            if(!message.member.roles.cache.has(this.client.config.configGeral.cargoYoutuber)) return message.reply(`É necessário ser youtuber para executar esse comando!`)
            let database = await this.client.database.divulgar.findOne({ userId: message.author.id })
            if (database) {
                if (database.createdAt >= new Date().getTime()) {
                    return message.reply(`É necessário esperar \`${await this.client.functions.getRemainingTime(database.createdAt - new Date().getTime())}\` para divulgar outro vídeo!`)
                } else {
                    database.delete();
                }
            }
            const Youtube = new (require("simple-youtube-api"))(this.client.config.youtubeAPI)
            let url = args[0]
            if (!url) return message.reply(`É preciso informar o URL do vídeo!`)

            let video = await Youtube.getVideo(url).catch(() => { })
            if (!video) return message.reply("O URL informado está incorreto! Envie-o corretamente.")
            let YoutubeChannel = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${video.raw.snippet.channelId}&key=${this.client.config.youtubeAPI}`)
            let videoViews = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video.raw.id}&key=${this.client.config.youtubeAPI}`)
            let tilleVideo = video.raw.snippet.title;
            let authorTheVideo = video.raw.snippet.channelTitle;
            let thumbnailVideo = video.thumbnails.medium.url;
            let duracaoVideo = `**${video.duration.minutes}** minutos e **${video.duration.seconds}** segundos`
            let subs = YoutubeChannel.data.items[0].statistics.subscriberCount;
            let views = videoViews.data.items[0].statistics.viewCount;
            let channel = await this.client.guilds.cache.get(message.guild.id).channels.cache.get(this.client.config.configGeral.channelDivulgar);

            let embed = new MessageEmbed()
                .setAuthor({ name: `O Youtuber ${message.author.username} está divulgando um vídeo!`, iconURL: message.author.displayAvatarURL() })
                .setTitle(`${tilleVideo}`)
                .setDescription(`O vídeo foi postado no canal **${authorTheVideo}** com a quantidade de inscritos **${subs}**.\nO vídeo consta com ${duracaoVideo} de duração e está com **${views}** views!`)
                .setURL(`${url}`)
                .setThumbnail(`${thumbnailVideo}`)
            channel.send({ embeds: [embed] })
            this.client.database.divulgar.create({
                userId: message.author.id,
                createdAt: new Date().getTime() + this.client.config.configGeral.delayDivulgar // 1 dia
            })
        } catch (error) {
            console.log(error);
            console.log(`\x1b[91m[Commands] Ocorreu um erro ao executar o comando ${this.name}.js\x1b[0m`)
        }
    }
}
