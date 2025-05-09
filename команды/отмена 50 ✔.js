let utils = require('../utils.js')

const commands =[]

const fs = require('fs');

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

cmd.hear(/^(?:отмена|cancel|отменить|отмени|верни)\s(50)$/i, async (message, bot) => {
    if (message.chat.type === 2) {

        // Найти последнюю ставку пользователя
        const lastBet = message.chat.games[message.chat.games.length - 1].stavki.find(x => x.id === message.senderId && x.type === 50);

        if (!lastBet) return bot(`У вас нет активной ставки на x50 для отмены.`);

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
        message.chat.games[message.chat.games.length - 1].stavki = message.chat.games[message.chat.games.length - 1].stavki.filter(x => x.id !== message.senderId || x.type !== 50);

        return bot(`Ваша ставка на x50 в размере ${utils.sp(lastBet.amount)} ${val4} была отменена. Вам возвращено ${utils.sp(refundAmount)} ${val4}.`);
    }
    });





module.exports = commands;
