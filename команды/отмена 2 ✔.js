let utils = require('../utils.js')

const commands =[]

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const fs = require('fs');
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


cmd.hear(/^(?:отмена|cancel|отменить|отмени|верни)\s(2)$/i, async (message, bot) => {
    if (message.chat.type === 2) {
    

        // Найти последнюю ставку пользователя
        const lastBet = message.chat.games[message.chat.games.length - 1].stavki.find(x => x.id === message.senderId && x.type === 2);

        if (!lastBet) return bot(`У вас нет активной ставки на x2 для отмены.`);

        let refundAmount;

        // Определяем процент возврата в зависимости от суммы ставки
        if (lastBet.amount <= 100000) {
            refundAmount = Math.floor(lastBet.amount * 0.95); // 5% штраф
        } else if (lastBet.amount <= 1000000) {
            refundAmount = Math.floor(lastBet.amount * 0.90); // 10% штраф
        } else {
            refundAmount = Math.floor(lastBet.amount * 0.85); // 15% штраф
        }

        // Возврат средств пользователю
        message.user.balance2 += refundAmount;

        // Удаление ставки из массива
        message.chat.games[message.chat.games.length - 1].stavki = message.chat.games[message.chat.games.length - 1].stavki.filter(x => x.id !== message.senderId || x.type !== 2);

        return bot(`Ваша ставка на x2 в размере ${utils.sp(lastBet.amount)} ${val4} была отменена. Вам возвращено ${utils.sp(refundAmount)} ${val4}.`);
    }
    });



module.exports = commands;
