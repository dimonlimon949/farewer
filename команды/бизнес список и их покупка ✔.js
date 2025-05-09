let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens; // Возвращаем все данные из файла
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null; // Возвращаем null в случае ошибки
  }
}


// Пример использования
const tokenData = getToken();

const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

const businesses = require("../spisok/business spisok.js")
const businesses2 = require("../spisok/бизнесы.js")

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


cmd.hear(/^(?:бизнесы|💼 Бизнесы)\s?([0-9]+)?$/i, async (message, bot) => {
  try {
    let response = null; // Добавляем переменную для хранения ответа
    if (!message.isChat || message.chat.type === 1) {
      response = await showBusinessListPrivate(message, bot); // Сохраняем ответ
    } else if (message.chat.type === 2) {
      response = await showBusinessListGroup(message, bot); // Сохраняем ответ
    }
    return response; // Возвращаем ответ
  } catch (error) {
    console.error("Ошибка в команде /бизнесы:", error);
    const errorText = "⚠️ Произошла ошибка при отображении списка бизнесов. Пожалуйста, попробуйте позже.";
    await bot(errorText);
    return errorText; // Возвращаем текст ошибки
  }
});

async function showBusinessListPrivate(message, bot) {
    if (!message.args[1]) {
        let businessList = `🏢 Доступные бизнесы: 🏢 ✨\n\n`;
        for (let i = 0; i < businesses2.length && i < 13; i++) {
            const business = businesses2[i][0];
            const numberEmoji = getNumberEmoji(i + 1);
            let totalEarn = parseInt(business.earn); // Начальный доход = доход базы
            for (let j = 1; j < businesses2[i].length; j++) {
                const upgrade = businesses2[i][j];
                totalEarn += parseInt(upgrade.earn)
            }
            const dailyIncome = totalEarn * 24; // Доход в день
            businessList += `${numberEmoji} ${business.icon} ${business.name} - ${utils.sp(business.cost)} ${val1}\n`;
            businessList += `   💰 Прибыль: ${utils.sp(business.earn)} ${val1}/час\n`;
            //  businessList += `   🤑 Прибыль в день: ${utils.sp(dailyIncome)} $\n`;
            //  businessList += `   🛠️ Улучшения: 🛠️\n`;
            //  for (let j = 1; j < businesses2[i].length; j++) {
            //    const upgrade = businesses2[i][j];
            //    businessList += `     - Улучшение ${j}: +${utils.sp(upgrade.earn)} $/час\n`;
            // }
            businessList += "\n";
        }

        businessList += `📝 Для покупки введите «Бизнесы [номер бизнеса]»`;
        return bot(businessList);
    }

    if (message.user.inf === true) return bot(`🚫 Выключите безлимитный баланс`);

    if (message.user.settings.busi === true) {
        if (message.user.business2.length >= 2)
            return bot(`🚫 Максимум можно иметь 2 бизнеса`);
    } else {
        if (message.user.business2.length >= 1)
            return bot(`🚫 Максимум можно иметь 1 бизнес`);
    }

    // Преобразуем аргумент в число и проверяем на NaN
    const businessNumber = Number(message.args[1]);
    if (isNaN(businessNumber)) {
        return bot("🚫 Неверный номер бизнеса (не число).");
    }

    // Вычисляем индекс бизнеса
    let businessIndex = businessNumber - 1;

    // Добавляем отладочный вывод
    console.log("message.args[1]:", message.args[1]);
    console.log("businessIndex:", businessIndex);
    console.log("businesses2.length:", businesses2.length);

    // Проверяем, что businessIndex находится в допустимых пределах
    if (businessIndex < 0 || businessIndex >= businesses2.length) {
        return bot("🚫 Неверный номер бизнеса (вне диапазона).");
    }

    // Проверяем, что businesses2[businessIndex] существует и не является null/undefined
    if (!businesses2[businessIndex] || !Array.isArray(businesses2[businessIndex]) || businesses2[businessIndex].length === 0) {
        console.error("Ошибка: businesses2[" + businessIndex + "] не существует или пуст.");
        return bot("⚠️ Произошла ошибка при получении информации о бизнесе. Пожалуйста, попробуйте позже.");
    }

    const sell = businesses2[businessIndex][0];

    if (sell == null) return;

    if (message.user.balance < sell.cost)
        return bot(
            `🚫 У Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                message.user.balance
            )} ${val1} 💵`
        );

    message.user.balance -= sell.cost;

    message.user.business2.push({
        id: businessIndex + 1,
        upgrade: 1,
        workers: 1,
        moneys: 0,
    });

    if (message.user.now.kv1 && message.user.now.kv2 && !message.user.now.kv3) {

        message.user.now.kv3 = true;
        message.user.bank += 50000000;
        const taskCompleteMessage = `✅ Ты успешно выполнил 3 задание! Покупка бизнеса награда - 50.000.000 ${val1} на свой банковский счет\n\n💡 Регулярно проверяй бизнесы и забирай прибыль!`;
        await bot(taskCompleteMessage, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({ command: `путь новичка` }),
                            "label": `👀 Путь новичка`
                        },
                        "color": "positive"
                    }]
                ]
            })
        });
        return taskCompleteMessage;


    }

    const purchaseMessage = `🎉 Вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1} 🚀`;
    return bot(purchaseMessage);
}


function getNumberEmoji(number) {
    if (number >= 1 && number <= 9) {
        const circleNumbers = [
            "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"
        ];
        return circleNumbers[number - 1];
    }
    else if (number >= 10 && number <= 20) {
        const circleNumbers = [
            "1️⃣0️⃣", "1️⃣1️⃣", "1️⃣2️⃣", "1️⃣3️⃣", "1️⃣4️⃣", "1️⃣5️⃣", "1️⃣6️⃣", "1️⃣7️⃣", "1️⃣8️⃣", "1️⃣9️⃣", "2️⃣0️⃣"
        ];
        return circleNumbers[number - 10];
    }
    else if (number >= 21 && number <= 30) {
        const circleNumbers = [
            "2️⃣1️⃣", "2️⃣2️⃣", "2️⃣3️⃣", "2️⃣4️⃣", "2️⃣5️⃣", "2️⃣6️⃣", "2️⃣7️⃣", "2️⃣8️⃣", "2️⃣9️⃣", "3️⃣0️⃣"
        ];
        return circleNumbers[number - 21]
    }
    else {
        return number.toString();
    }
}

async function showBusinessListGroup(message, bot) {
    if (!message.args[1]) {
        let businessList = `🏢 Доступные бизнесы: 🏢 ✨\n\n`;
        for (let i = 0; i < businesses.length; i++) {
            const business = businesses[i][0];
            const numberEmoji = getNumberEmoji(i + 1);
            let totalEarn = parseInt(business.earn);
            for (let j = 1; j < businesses[i].length; j++) {
                const upgrade = businesses[i][j];
                totalEarn += parseInt(upgrade.earn)
            }
            const dailyIncome = totalEarn * 24; // Доход в день
            businessList += `⭐ ${numberEmoji} ${business.icon} ${business.name} (ID: ${business.id}) - ${utils.sp(business.cost)} ${val4}\n`;
            businessList += `   💰 Прибыль: ${utils.sp(business.earn)} ${val4}/час\n`;
            // businessList += `   🤑 Прибыль в день: ${utils.sp(dailyIncome)} ${val4}\n`;
            // businessList += `   🛠️ Улучшения: 🛠️\n`;
            //  for (let j = 1; j < businesses[i].length; j++) {
            //    const upgrade = businesses[i][j];
            //    businessList += `     - Улучшение ${j}: +${utils.sp(upgrade.earn)} ${val4}/час\n`;
            // }
            businessList += "\n";
        }
        businessList += `📝 Для покупки введите «Бизнесы [номер бизнеса]»`;
        return bot(businessList);
    }

    if (!message.user.settings) {
        message.user.settings = {};
    }

    if (message.user.settings.busi === true) {
        if (message.user.business.length >= 2)
            return bot(`🚫 Максимум можно иметь 2 бизнеса`);
    } else {
        if (message.user.business.length >= 1)
            return bot(`🚫 Максимум можно иметь 1 бизнес1`);
    }

    if (message.args[1] < 1 || message.args[1] >= 9)
        return bot("🚫 Неверный номер бизнеса.");

    let businessIndex = Number(message.args[1]) - 1;

    const sell = businesses[businessIndex][0];

    if (sell == null) return;

    if (message.user.balance2 < sell.cost)
        return bot(
            `🚫 У вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                message.user.balance2
            )} ${val4}. 💵`
        );

    message.user.balance2 -= sell.cost;

    if (message.user.questbrak == false) {

        message.user.questbrak = true;

        const questCompleteMessage = `Поздравляем, Вы купили бизнес на ${val4} и получаете 📦 200 рейтинга.`;
        await bot(questCompleteMessage);
        message.user.rating += 200;
        await questCompleteMessage;

    }

    if (message.user.now.kv1 && message.user.now.kv2 && !message.user.now.kv3) {

        message.user.balance2 += 25000;
        message.user.now.kv3 = true;
        const taskCompleteMessage = `✅ Ты успешно выполнил 3 задание! Покупка бизнеса награда - 25.000 ${val4}\n\n💡 Регулярно проверяй бизнесы и забирай прибыль!`;
        await bot(taskCompleteMessage, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({ command: `путь новичка` }),
                            "label": `👀 Путь новичка`
                        },
                        "color": "positive"
                    }]
                ]
            })

        });
        return taskCompleteMessage;

    }

    message.user.business.push({
        id: businessIndex + 1,
        upgrade: 1,
        workers: 1,
        moneys: 0,
    });

    const purchaseMessage = `🎉 Вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val4} 🚀`;
    return bot(purchaseMessage);
}

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

module.exports = commands;