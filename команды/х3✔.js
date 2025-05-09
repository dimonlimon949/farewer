let utils = require('../utils.js');

const commands = [];

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};


const tokensFilePath3 = './настройки/валюты.json';

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const fs = require('fs');

const tokenData3 = getToken3(); 

let val1 = tokenData3.val1
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4
let val5 = tokenData3.val5

let tokensCache = null;

setInterval(() => {
  tokensCache = getToken3(); 
  if (tokensCache) {
      val1 = tokensCache.val1; 
      val2 = tokensCache.val2; 
      val3 = tokensCache.val3; 
      val4 = tokensCache.val4; 
  }
}, 1000);

const promptBet = (message, bot) => {
    return bot('нажми кнопку ИЛИ введи команду: "3 [сумма ставки]"', {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        "payload": "{}",
                        "label": `x3 ${message.user.lastbet}`
                    },
                    "color": "default"
                },
                {
                    "action": {
                        "type": "text",
                        "payload": "{}",
                        "label": `x3 ${message.user.lastbet * 2}`
                    },
                    "color": "default"
                },
                {
                    "action": {
                        "type": "text",
                        "payload": "{}",
                        "label": `x3 ${message.user.balance2}`
                    },
                    "color": "default"
                }]
            ]
        })
    });
};

const processBetAmount = (input, userBalance) => {
    return input.replace(/(\.|\,)/ig, '')
                .replace(/(к|k)/ig, '000')
                .replace(/(м|m)/ig, '000000')
                .replace(/(вабанк|вобанк|все|всё)/ig, userBalance);
};

const updateGameStakes = (message, amount) => {
    const lastGame = message.chat.games[message.chat.games.length - 1];
    const existingStake = lastGame.stavki.find(x => x.id === message.senderId && x.type === 3);

    if (existingStake) {
        existingStake.amount += amount;
    } else {
        lastGame.stavki.push({
            uid: message.user.uid,
            id: message.user.id,
            type: 3,
            amount: amount
        });
    }
};

cmd.hear(/^(?:x3|3)$/i, async (message, bot) => {
    if (!message.isChat) {
        return
    }
    if (message.chat.type === 2) {
        if (message.chat.type === 0 || message.user.balance2 <= 0) return bot(`на твоем балансе нет коинов...`);
        if (!isFinite(message.user.balance2)) {
            message.user.balance2 = 0;
            return bot(`В твоем богатстве царило бесконечное изобилие, но увы, теперь оно обнулено.`);
        }
        return promptBet(message, bot);
    }
});

cmd.hear(/^(?:x3|3)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat) {
        return
    }
    if (message.chat.type === 2) {
        if (message.chat.type === 0 || message.user.balance2 <= 0) return bot(`на твоем балансе нет коинов...`);
        if (!isFinite(message.user.balance2)) {
            message.user.balance2 = 0;
            return bot(`в твоем богатстве царило бесконечное изобилие, но увы, теперь оно обнулено.`);
        }
        if (message.chat.gametime < 6) return;

        const rawAmount = processBetAmount(message.args[1], message.user.balance2);
        const betAmount = Math.floor(Number(rawAmount));

        if (isNaN(betAmount) || betAmount <= 0 || betAmount > message.user.balance2) {
            return promptBet(message, bot);
        }

        message.user.balance2 -= betAmount;
        updateGameStakes(message, betAmount);
        message.user.lastbet = betAmount;

        return bot(`успешная ставка ${utils.sp(betAmount)} ${val4} на x3`);
    }
});

module.exports = commands;
