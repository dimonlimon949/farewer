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
let farms = require('../spisok/фермы.js')
const vk = require('../vk-api.js'); 

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

const val1 = tokenData3.val1
const val2 = tokenData3.val2
const val3 = tokenData3.val3
const val4 = tokenData3.val4
const val5 = tokenData3.val5

cmd.hear(/^(?:фермы|🔋 Фермы)\s?([0-9]+)?\s?([0-9]+)?$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.args[1]) {
      return bot(`🔋 Майнинг фермы:\n
        ${message.user.misc.farm === 1 ? '✔️' : '✖️'} 1. ${
        farms.find((x) => x.id === Number(1)).name
      } ${utils.sp(
        farms.find((x) => x.id === Number(1)).prib
      )} ₿/ч. (${utils.sp(
        farms.find((x) => x.id === Number(1)).cost
      )} ${val1})\n
        ${message.user.misc.farm === 2 ? '✔️' : '✖️'} 2. ${
        farms.find((x) => x.id === Number(2)).name
      } ${utils.sp(
        farms.find((x) => x.id === Number(2)).prib
      )} ₿/ч. (${utils.sp(
          farms.find((x) => x.id === Number(2)).cost
        )} ${val1})\n
        ${message.user.misc.farm === 3 ? '✔️' : '✖️'} 3. ${
        farms.find((x) => x.id === Number(3)).name
      } ${utils.sp(
        farms.find((x) => x.id === Number(3)).prib
      )} ₿/ч. (${utils.sp(
          farms.find((x) => x.id === Number(3)).cost
        )} ${val1})\n
        ${message.user.misc.farm === 4 ? '✔️' : '✖️'} 4. ${
        farms.find((x) => x.id === Number(4)).name
      } ${utils.sp(
        farms.find((x) => x.id === Number(4)).prib
      )} ₿/ч. (${utils.sp(
          farms.find((x) => x.id === Number(4)).cost
        )} ${val1})\n
        ${message.user.misc.farm === 5 ? '✔️' : '✖️'} 5. ${
        farms.find((x) => x.id === Number(5)).name
      } ${utils.sp(
        farms.find((x) => x.id === Number(5)).prib
      )} ₿/ч. (${utils.sp(
          farms.find((x) => x.id === Number(5)).cost
        )} ${val1})\n
        ${message.user.misc.farm === 6 ? '✔️' : '✖️'} 6. ${
        farms.find((x) => x.id === Number(6)).name
      } ${utils.sp(
        farms.find((x) => x.id === Number(6)).prib
      )} ₿/ч. (${utils.sp(
          farms.find((x) => x.id === Number(6)).cost
        )} ${val1})\n
        ${message.user.misc.farm === 7 ? '✔️' : '✖️'} 7. ${
        farms.find((x) => x.id === Number(7)).name
      } ${utils.sp(
        farms.find((x) => x.id === Number(7)).prib
      )} ₿/ч. (${utils.sp(
          farms.find((x) => x.id === Number(7)).cost
        )} ${val1})\n
        
        \n🛒 Для покупки введите «Фермы [номер] [количество]»`);
    }
    if (message.user.inf) {
      return bot(`👁️ Выключите безлимитный баланс`);
    }

    const sell = farms.find(x => x.id === Number(message.args[1]));
    if (!sell) return;

    const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);
    if (count <= 0) return bot(`❌ Вы указали количество ферм меньше 1-го.`);

    if (message.args[1] < 1 || message.args[1] >= 8) return bot('😒 Неверный номер ферм.');

    if (!message.user.settings.imperator) {
      if (count + message.user.misc.farm_count > message.user.limit.farmlimit) {
        return bot(`❌ Вы не можете иметь больше ${message.user.limit.farmlimit} штук ферм одновременно.`);
      }
    } else {
      if (count + message.user.misc.farm_count > 1000000) {
        if (count + message.user.misc.farm_count > message.user.limit.farmlimit) {
          return bot(`❌ Вы не можете иметь больше ${message.user.limit.farmlimit} штук ферм одновременно.`);
        }
      }
    }

    if (message.user.misc.farm != 0 && message.user.misc.farm != message.args[1]) {
      return bot(`😨 Вы не можете купить ферму другого типа!`);
    }

    if (message.user.balance < sell.cost * count) {
      return bot(`💰 У Вас недостаточно денег! ❌\n\nВаш баланс: ${utils.sp(message.user.balance)} ${val1} 💵`);
    } else {
      message.user.balance -= sell.cost * count;
      message.user.misc.farm = sell.id;
      message.user.misc.farm_count += count;


      if (message.user.now.kv1 && !message.user.now.kv2) { 
        message.user.now.kv2 = true;
        message.user.misc.farm_count += 10;
        await bot(`✅ Ты успешно выполнил 2 задание! 
      Награда - 10 ферм 🔋. 
      
      💡 Не забывай, что каждый час ты можешь забирать с фермы биткоины и продавать их за ${val1}!`, {
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
      }

      return bot(`🎉 Вы купили «${sell.name}» (${count} шт.) за ${utils.sp(sell.cost * count)} ${val1}`);
    }
  }
});

cmd.hear(/^(?:ферма)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.misc.farm) return bot(`у вас нет фермы`);

    if (!message.user.farm_btc)
      return bot(`на вашей ферме пусто, новые биткоины появятся скоро`);

    let btc_ = message.user.farm_btc * message.user.misc.farm_count;

    if (message.user.farm_count >= 10000000) Math.floor((btc_ /= 2));

    message.user.btc += btc_;

    message.user.farm_btc = 0;

    return bot(`вы собрали ${utils.sp(
      btc_
    )} ₿, следующие биткоины появятся через час
💾 Биткоинов: ${utils.sp(message.user.btc)} ฿`);
  }
});

cmd.hear(/^(?:ферма инфо)$/i, async (message, bot) => {
  const farmss = [
    { id: 1, name: farms.find((x) => x.id === Number(1)).name, prib: farms.find((x) => x.id === Number(1)).prib },
    { id: 2, name: farms.find((x) => x.id === Number(2)).name, prib: farms.find((x) => x.id === Number(2)).prib },
    { id: 3, name: farms.find((x) => x.id === Number(3)).name, prib: farms.find((x) => x.id === Number(3)).prib },
    { id: 4, name: farms.find((x) => x.id === Number(4)).name, prib: farms.find((x) => x.id === Number(4)).prib },
    { id: 5, name: farms.find((x) => x.id === Number(5)).name, prib: farms.find((x) => x.id === Number(5)).prib },
    { id: 6, name: farms.find((x) => x.id === Number(6)).name, prib: farms.find((x) => x.id === Number(6)).prib },
    { id: 7, name: farms.find((x) => x.id === Number(7)).name, prib: farms.find((x) => x.id === Number(7)).prib },
  ];

  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.misc.farm) return bot('у вас нет фермы');

    const farmCount = message.user.misc.farm_count;
    const farmType = message.user.misc.farm; // Получаем тип фермы
    const farm = farmss.find(f => f.id === farmType); // Находим ферму по типу

    if (!farm) {
      return bot('Ошибка: Не удалось найти информацию о ферме.');
    }

    const btcPerHourPerFarm = farm.prib; 
    
    const nameferm = farm.name; // Используем farm.prib

    const btc_ = message.user.farm_btc ;

    let btcPerHourTotal = Math.round(btcPerHourPerFarm * farmCount)


    const formattedBtcPerHourTotal = utils.sp(btcPerHourTotal); // Убрали toFixed(3)

    return bot(`На ваших фермах накопилось ${utils.sp(btc_)} ₿ 🌐 \n` +
               `Статистика:\n` +
               `📊 Название: ${nameferm}\n` +
               `📊 Количество: ${utils.sp(farmCount)} шт.\n` +
               `✅ Доход: ${formattedBtcPerHourTotal} ฿/час`);
  }
});

module.exports = commands;
