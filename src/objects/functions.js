const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { writeFileSync } = require("fs");
const moment = require("moment");
moment.locale("pt-br");

module.exports = class Functions {
    constructor(client) {
        this.client = client;
    }
    async getFormatedTime(time) {
        try {
            time = parseInt(time);
            if (!time) return undefined;
            let formated = [];
            let days = Math.floor(time / (60 * 60 * 24 * 1000));
            if (days > 0) { time = time - (days * (60 * 60 * 24 * 1000)); if (days == 1) { formated.push(`${days} dia`) } else { formated.push(`${days} dias`) }; };
            let hours = Math.floor(time / (60 * 60 * 1000));
            if (hours > 0) { time = time - (hours * (60 * 60 * 1000)); if (hours == 1) { formated.push(`${hours} hora`) } else { formated.push(`${hours} horas`) }; };
            let minutes = Math.floor(time / (60 * 1000));
            if (minutes > 0) { time = time - (minutes * (60 * 1000)); if (minutes == 1) { formated.push(`${minutes} minuto`) } else { formated.push(`${minutes} minutos`) }; };
            let seconds = Math.floor(time / 1000);
            if (seconds > 0) { time = time - (seconds * (60 * 1000)); if (seconds == 1) { formated.push(`${seconds} segundo`) } else { formated.push(`${seconds} segundos`) }; };
            let returnString = formated.join(", ");
            if (formated.length > 1) {
                let last = formated.pop();
                returnString = formated.join(", ") + " e " + last;
            }
            return returnString;
        } catch (error) {
            console.log(error);
            console.log(`\x1b[91m[Functions] Ocorreu um erro ao executar a função getFormatedTime\x1b[0m`);
        }
    }

    async getRemainingTime(time) {
        try {
            time = parseInt(time);
            if (!time) return undefined;
            let formated = [];
            let days = Math.floor(time / (60 * 60 * 24 * 1000));
            if (days > 0) { time = time - (days * (60 * 60 * 24 * 1000)); if (days == 1) { formated.push(`${days} d`) } else { formated.push(`${days}ds`) }; };
            let hours = Math.floor(time / (60 * 60 * 1000));
            if (hours > 0) { time = time - (hours * (60 * 60 * 1000)); if (hours == 1) { formated.push(`${hours}hr`) } else { formated.push(`${hours}hrs`) }; };
            let minutes = Math.floor(time / (60 * 1000));
            if (minutes > 0) { time = time - (minutes * (60 * 1000)); if (minutes == 1) { formated.push(`${minutes}m`) } else { formated.push(`${minutes}m`) }; };
            let seconds = Math.floor(time / 1000);
            if (seconds > 0) { time = time - (seconds * (60 * 1000)); if (seconds == 1) { formated.push(`${seconds}s`) } else { formated.push(`${seconds}s`) }; };
            let returnString = formated.join(", ");
            if (formated.length > 1) {
                let last = formated.pop();
                returnString = formated.join(", ") + " e " + last;
            }
            return returnString;
        } catch (error) {
            console.log(error);
            console.log(`\x1b[91m[Functions] Ocorreu um erro ao executar a função getRemainingTime \x1b[0m`);
        }
    }
};