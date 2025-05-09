const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');

const tokensFilePath = './настройки/токены.json';

function getToken() {
    try {
        const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
        return tokens;
    } catch (error) {
        console.error('Ошибка при чтении токенов:', error);
        return null;
    }
}

const tokenData = getToken();

const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js'); 

const commands = [];
const cmd = {
    hear: (pattern, action) => {
         commands.push([pattern, action]);

    }
};

const async = require('async');

// Команда для получения топ-аниме
cmd.hear(/^(?:топик)\s?/i, async (message, bot) => {
    return bot(`Выберите действие:`,{
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `аниме`}),
                        "label": `🍭 Лоли-аниме`
                    },
                    "color": "positive"
                },
                {
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `гиф аниме`}),
                        "label": `✨ Аниме-гифка`
                    },
                    "color": "positive"
                }]
            ]
        })
    })
});



module.exports = commands;