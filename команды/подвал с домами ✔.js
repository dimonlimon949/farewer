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

// Функция для записи токена и других данных
function saveTokens(token, spoler, chatlogi) {
  const tokens = {
    token: token,
    spoler: spoler,
    chatlogi: chatlogi
  };

  try {
    fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
    console.log('Токены успешно сохранены.');
  } catch (error) {
    console.error('Ошибка при сохранении токенов:', error);
  }
}

// Пример использования
const tokenData = getToken();
let homes = require('../spisok/дома.js')
let videocards = require('../spisok/видеокарты.js')
const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


cmd.hear(/^(?:Подвал)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.realty.home === 0)
      return bot(`У вас нет дома, чтобы иметь подвал! ❌`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `дома`}),
                        "label": `🏠 Дома`
                    },
                    "color": "positive"
                }]
            ]
        })
    }); 

    if (!message.user.realty.basement)
      return bot(
        `Информация о Вашем подвале:\n\n🌐 Подвал используется для майнинга DogeCoin (DOG) 🪙\n💰 Чтобы купить подвал введите команду «Купить подвал» ❓`, {
          keyboard: JSON.stringify({
              "inline": true,
              "buttons": [
                  [{
                      "action": {
                          "type": "text",
                          payload: JSON.stringify({command: `купить подвал`}),
                          "label": `🏠 Купить подвал`
                      },
                      "color": "positive"
                  }]
              ]
          })
      }
      );

    if (message.user.realty.basement && message.user.misc.videocard_count < 1)
      return bot(
        `Информация о Вашем подвале:\n\n📼 У вас нет видеокарт! ❌\n❓ Покупка видеокарт: Видеокарты ☃️`
      );

    if (message.user.realty.basement && message.user.misc.videocard_count > 0) {
      const sell = videocards.find((x) => x.id === message.user.misc.videocard);

      return bot(
        `Информация о Вашем подвале:\n📼 Ваши видеокарты:\n ${sell.name} (${message.user.misc.videocard_count
        }шт.)\n💰 Баланс видеокарты: ${utils.sp(
          message.user.videocard_dg
        )} DOG\n🔸 Снять баланс: Видеокарта снять`
      );
    }
  }
});

cmd.hear(/^(?:Видеокарта снять)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (!message.user.misc.videocard) return bot(`У вас нет видеокарты ❌`);

    if (!message.user.videocard_dg)
      return bot(
        `на вашей видеокарте ничего нет, новые DogeCoin появятся скоро! ✅`
      );

    const dg_ = message.user.videocard_dg * message.user.misc.videocard_count;

    message.user.dcoins += dg_;

    message.user.videocard_dg = 0;

    return bot(
      `вы собрали ${utils.sp(
        dg_
      )} DOG, следующие появятся через час. ⌚\n🪙 Баланс DOG: ${utils.sp(
        message.user.dcoins
      )}`
    );
  }
});

cmd.hear(/^(?:дом|🏡 Дом|дома)\s?([0-9]+)?$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.realty.home !== 0 && !message.user.realty.basement) {
      return bot(
        `Информация о Вашем доме:\n\n🏡 Дом: «${homes[message.user.realty.home - 1].name
        }»\n▶️ Чтобы начать майнить DogeCoin, для начала нужно купить подвал!\n🔰 Цена подвала: 100 SpringCoins ☣️`
      );
    }

    if (message.user.realty.home !== 0 && message.user.realty.basement) {
      return bot(
        `Информация о Вашем доме:\n\n🏡 Дом: «${homes[message.user.realty.home - 1].name
        }»\n▶️ Подвал: установлен`
      );
    }

    utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]);

    if (!message.args[1] && message.user.realty.home === 0)
      return bot(`дома:

${message.user.realty.home === 1 ? "✔️" : "✖️"
        } 1. Деревенский домик (${utils.sp(
          homes.find((x) => x.id === Number(1)).cost
        )}$)
${message.user.realty.home === 2 ? "✔️" : "✖️"} 2. Маленький домик (${utils.sp(
          homes.find((x) => x.id === Number(2)).cost
        )}$)
${message.user.realty.home === 3 ? "✔️" : "✖️"
        } 3. Особняк в центре города (${utils.sp(
          homes.find((x) => x.id === Number(3)).cost
        )}$)
${message.user.realty.home === 4 ? "✔️" : "✖️"} 4. Загородный дом (${utils.sp(
          homes.find((x) => x.id === Number(4)).cost
        )}$)
${message.user.realty.home === 5 ? "✔️" : "✖️"} 5. Дом Тима Кука (${utils.sp(
          homes.find((x) => x.id === Number(5)).cost
        )}$)

🛒Для покупки введите «Дом [номер]» `);

    const sell = homes.find((x) => x.id === Number(message.args[1]));

    if (!sell) return;

    if (message.user.realty.home)
      return bot(
        `у вас уже есть дом (${homes[message.user.realty.home - 1].name
        }), введите "Продать дом"`
      );

    if (message.user.balance < sell.cost) return bot(`недостаточно денег`);
    else if (message.user.balance >= sell.cost) {
      message.user.balance -= sell.cost;

      message.user.realty.home = sell.id;

      return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)}$`);
    }
  }
});

cmd.hear(
  /^(?:видеокарты|🔋 видеокарты)\s?([0-9]+)?\s?(.*)?$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (message.user.realty.home === 0) return bot(`у Вас нет дома! ❌`);

      if (!message.user.realty.basement) return bot(`у Вас нет подвала! ❌`);

      if (!message.args[1])
        return bot(`Майнинг видеокарты:

${message.user.misc.videocard === 1 ? "✔️" : "✖️"
          } 1. MSI Radeon R7360 OC (2.000 DogeCoins/час) (100 SpringCoins)
${message.user.misc.videocard === 2 ? "✔️" : "✖️"
          } 2. GIGABYTE GeForce GTV 750 Ti (100.000 DogeCoins/час) (250 SpringCoins)
${message.user.misc.videocard === 3 ? "✔️" : "✖️"
          } 3. Gigabyte GeForce GTX 1080 (500.000 DogeCoins/час) (500 SpringCoins)

🛒 Для покупки введите «Видеокарты [номер] [количество]»`);

      const sell = videocards.find((x) => x.id === Number(message.args[1]));

      if (!sell) return;

      const count = Math.floor(message.args[2] ? Number(message.args[2]) : 1);

      if (count <= 0) return bot(`Вы указали кол-во видеокарт меньше 1-го ❌`);

      if (message.args[1] < 1 || message.args[1] >= 4)
        return bot("😒 Неверный номер видеокарты.");

      if (
        count + message.user.misc.videocard_count >
        message.user.limit.videocardlimit
      )
        return bot(
          `вы не можете иметь больше ${message.user.limit.videocardlimit}шт. видеокарт одновременно ❌`
        );

      if (
        message.user.misc.videocard !== 0 &&
        message.user.misc.videocard !== message.args[1]
      )
        return bot(`вы не можете купить видеокарту другого типа! ❌`);

      if (message.user.sprcoin < sell.cost * count)
        return bot(`недостаточно SpringCoins ❌`);
      else if (message.user.sprcoin >= sell.cost * count) {
        message.user.sprcoin -= sell.cost * count;

        message.user.misc.videocard = sell.id;

        message.user.misc.videocard_count += count;

        return bot(
          `вы купили «${sell.name}» (${count} шт.) за ${utils.sp(
            sell.cost * count
          )} SpringCoins ☣️`
        );
      }
    }
  }
);

module.exports = commands;
