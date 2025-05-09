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

let pets = require('../spisok/питомцы.js')
let pets2 = require('../spisok/питомцы2.js')
let pets3 = require('../spisok/питомцы3.js')
let petsupd = require('../spisok/питомцыул.js')


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

const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
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

function addZero(num) {
  return num < 10 ? '0' + num : num;
}

function unixStampLefta(stampa) {
  stampa = stampa / 1000; // Преобразуем миллисекунды в секунды
  let s = Math.floor(stampa % 60); // Остаток от деления на 60 для секунд
  stampa = Math.floor(stampa / 60); // Убираем секунды

  let m = Math.floor(stampa % 60); // Остаток от деления на 60 для минут
  stampa = Math.floor(stampa / 60); // Убираем минуты

  let h = Math.floor(stampa % 24); // Остаток от деления на 24 для часов
  let d = Math.floor(stampa / 24); // Делим на 24 для дней
  let y = Math.floor(d / 365); // Делим на 365 для лет
  d = d % 365; // Остаток от деления на 365 для дней

  // Формируем текст с учетом всех единиц времени
  let text = '';
  if (y > 0) text += `${y} г. `;
  if (d > 0) text += `${d} д. `;
  if (h > 0) text += `${addZero(h)} ч. `;
  text += `${addZero(m)} мин. ${addZero(s)} сек.`;

  return text.trim(); // Убираем лишние пробелы
}


cmd.hear(
  /^(?:питомцы|🦊 Питомцы|@club223500959 🦊 Питомцы)\s?([0-9]+)?$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      if (!message.args[1])
        return bot(`питомцы:
🐠 1. Рыбка (${utils.sp(pets.find((x) => x.id === Number(1)).cost)}${val1})
🐢 2. Черепашка (${utils.sp(pets.find((x) => x.id === Number(2)).cost)}${val1})
🦆 3. Утка (${utils.sp(pets.find((x) => x.id === Number(3)).cost)}${val1})
🐷 4. Свинья (${utils.sp(pets.find((x) => x.id === Number(4)).cost)}${val1})
🦘 5. Кенгуру (${utils.sp(pets.find((x) => x.id === Number(5)).cost)}${val1})
🐶 6. Собака (${utils.sp(pets.find((x) => x.id === Number(6)).cost)}${val1})
🐼 7. Панда (${utils.sp(pets.find((x) => x.id === Number(7)).cost)}${val1})
🦖 8. Динозавр (${utils.sp(pets.find((x) => x.id === Number(8)).cost)}${val1})
🐝 9. Пчелка (${utils.sp(
          pets.find((x) => x.id === Number(9)).cost
        )} SpringCoins ☣)
🐋 10. Кит (${utils.sp(
          pets.find((x) => x.id === Number(10)).cost
        )} SpringCoins ☣)

🛒 Для приобретения введите «Питомцы [номер]»`);

      const sell = pets.find((x) => x.id === Number(message.args[1]));

      if (!sell) return;

      if (message.user.misc.pet) return bot(`у Вас уже есть питомец.`);

      if (message.args[1] < 1 || message.args[1] > 10)
        return bot("Неверный номер питомца.");

      if (message.args[1] < 9) {
        if (message.user.balance < sell.cost)
          return bot(
            `у Вас недостаточно денег на балансе!\n\n🐶 Стоимость питомца: ${utils.sp(
              sell.cost
            )}${val1}\n💰 Ваш баланс: ${utils.sp(message.user.balance)}$${val1}`
          );
        else if (message.user.balance >= sell.cost) {
          message.user.balance -= sell.cost;

          message.user.misc.pet = sell.id;

          message.user.pet.lvl += 1;
        }
      }

      if (message.args[1] > 8) {
        if (message.user.sprcoin < sell.cost)
          return bot(
            `вам нужно ${utils.sp(sell.cost)} SpringCoins☣ для покупки.`
          );
        else if (message.user.sprcoin >= sell.cost) {
          message.user.sprcoin -= sell.cost;

          message.user.misc.pet = sell.id;

          message.user.pet.lvl += 1;
        }
      }

      const pet = pets.find((x) => x.id === message.user.misc.pet);

      return bot(
        `вы приобрели питомца «${sell.name}» за ${utils.sp(
          sell.cost
        )}${val1} 💵\n\n〽️ Прокачивайте своего питомца и отправляйте на прогулку, чтобы он приносил ещё больше денег! ${pet.ico
        }`
      );
    }
  }
);

cmd.hear(/^(?:питомец)$/i, async (message, bot) => {
  if (message.user.misc.pet < 1) return bot(`у Вас нет питомца.`);
  else {
    const pet = pets.find((x) => x.id === message.user.misc.pet);

    let text;
    let attachment;
    let upgradeCost;

    if (pets[message.user.misc.pet - 1].id > 19) {
      upgradeCost = utils.sp(
        petsupd[message.user.misc.pet - 1].cost * message.user.pet.lvl
      );
      text = `информация:
${pet.ico} Питомец: «${pets[message.user.misc.pet - 1].name}»
💳 Стоимость улучшения: ${upgradeCost} SpringCoins ☣️
🌟 Уровень: ${message.user.pet.lvl}`;
      attachment = pets[message.user.misc.pet - 1].photo;
    } else {
      upgradeCost = utils.sp(
        petsupd[message.user.misc.pet - 1].cost * message.user.pet.lvl
      );
      text = `информация о Вашем питомце: ❄️
${pet.ico} Питомец: «${pets[message.user.misc.pet - 1].name}» 🔥
➖➖➖➖➖
💵 Стоимость улучшения: ${upgradeCost}$
〽️ Уровень: ${utils.sp(message.user.pet.lvl)}`;
      attachment = pets[message.user.misc.pet - 1].photo;
    }


    const keyboard = {
      inline: true,
      buttons: [
        [
          {
            action: {
              type: "text",
              payload: { command: `питомец поход` },
              label: `🐾 Поход`,
            },
            color: "primary",
          },
          {
            action: {
              type: "text",
              payload: { command: `питомец улучшить` },
              label: `⬆️ Улучшить (${upgradeCost}${pets[message.user.misc.pet - 1].id > 19 ? ' SpringCoins' : '$'})`, // Динамическое отображение валюты
            },
            color: "positive",
          },
        ],
      ],
    };

    return bot(text, { attachment: attachment, keyboard: JSON.stringify(keyboard) });
  }
});

cmd.hear(/^(?:питомец 2)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.misc.pet2 < 1) return bot(`у Вас нет питомца.`);
    else {
      const pet2 = pets2.find((x) => x.id === message.user.misc.pet2);
      // Предполагаем, что petsupd2 существует и содержит информацию об улучшениях для питомца 2
      const upgradeCost = petsupd2 && petsupd2[message.user.misc.pet2 - 1]
        ? utils.sp(petsupd2[message.user.misc.pet2 - 1].cost * message.user.pet2.lvl) // Используем user.pet2.lvl
        : "Недоступно"; // Или какое-то значение по умолчанию

      const keyboard = {
        inline: true,
        buttons: [
          [
            {
              action: {
                type: "text",
                payload: { command: `питомец 2 поход` },
                label: `🐾 Поход`,
              },
              color: "primary",
            },
            {
              action: {
                type: "text",
                payload: { command: `питомец 2 улучшить` },
                label: `⬆️ Улучшить (${upgradeCost}${pets2[message.user.misc.pet2 - 1].id > 19 ? ' SpringCoins' : '$'})`, // Динамическое отображение валюты
              },
              color: "positive",
            },
          ],
        ],
      };

      return bot(
        `информация:

${pet2.ico} Питомец: «${pets2[message.user.misc.pet2 - 1].name}»

`,
        { attachment: pets2[message.user.misc.pet2 - 1].photo, keyboard: JSON.stringify(keyboard) }
      );
    }
  }
});

cmd.hear(/^(?:питомец 3)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.misc.pet3 < 1) return bot(`у Вас нет питомца.`);
    else {
      const pet3 = pets3.find((x) => x.id === message.user.misc.pet3);
      // Предполагаем, что petsupd3 существует и содержит информацию об улучшениях для питомца 3
      const upgradeCost = petsupd3 && petsupd3[message.user.misc.pet3 - 1]
        ? utils.sp(petsupd3[message.user.misc.pet3 - 1].cost * message.user.pet3.lvl)  // Используем user.pet3.lvl
        : "Недоступно"; // Или какое-то значение по умолчанию

      const keyboard = {
        inline: true,
        buttons: [
          [
            {
              action: {
                type: "text",
                payload: { command: `питомец 3 поход` },
                label: `🐾 Поход`,
              },
              color: "primary",
            },
            {
              action: {
                type: "text",
                payload: { command: `питомец 3 улучшить` },
                label: `⬆️ Улучшить (${upgradeCost}${pets3[message.user.misc.pet3 - 1].id > 19 ? ' SpringCoins' : '$'})`, // Динамическое отображение валюты
              },
              color: "positive",
            },
          ],
        ],
      };

      return bot(
        `информация:

${pet3.ico} Питомец: «${pets3[message.user.misc.pet3 - 1].name}»

`,
        { attachment: pets3[message.user.misc.pet3 - 1].photo, keyboard: JSON.stringify(keyboard) }
      );
    }
  }
});

cmd.hear(/^(?:питомец улучшить)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let lvlpoupd;
    let priceupd;
    if (message.user.inf === true) return bot(`Выключите безлимитный баланс`);

    if (message.user.misc.pet < 1)
      return bot(
        `у Вас нет питомца! 😿\n\n▶️ Просмотреть список продаваемых питомцев можно написав команду «Питомцы» 🛒`
      );
    else {
      const pet = pets.find((x) => x.id === message.user.misc.pet);

      if (pets[message.user.misc.pet - 1].id === 20) {
        if (
          message.user.sprcoin <
          petsupd[message.user.misc.pet - 1].cost * message.user.pet.lvl
        )
          return bot(`недостаточно SpringCoins ☣️`);

        if (message.user.pet.lvl > 14)
          return bot(`ваш питомец максимально улучшен! ${pet.ico}`);

        priceupd = petsupd[message.user.misc.pet - 1].cost * message.user.pet.lvl;

        lvlpoupd = message.user.pet.lvl + 1;

        message.user.sprcoin -= priceupd;

        message.user.pet.lvl += 1;

        return bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(
          priceupd
        )} SpringCoins ☣️
	Баланс SpringCoins: ${utils.sp(message.user.sprcoin)} ☣️`);
      }

      if (
        message.user.balance <
        petsupd[message.user.misc.pet - 1].cost * message.user.pet.lvl
      )
        return bot(
          `у Вас недостаточно денег! ❌\n\n▶️ Стоимость улучшения: ${utils.sp(
            petsupd[message.user.misc.pet - 1].cost * message.user.pet.lvl
          )}${val1} 💵\n💰 Ваш баланс: ${utils.sp(message.user.balance)}$${val1}`
        );

      if (message.user.pet.lvl > 14)
        return bot(`ваш питомец максимально улучшен! 😸`);

      priceupd = petsupd[message.user.misc.pet - 1].cost * message.user.pet.lvl;

      lvlpoupd = message.user.pet.lvl + 1;

      message.user.balance -= priceupd;

      message.user.pet.lvl += 1;

      return bot(`питомец был прокачен до ${lvlpoupd} уровня за ${utils.sp(
        priceupd
      )}${val1} 💵
▶️ Ваш баланс: ${utils.sp(message.user.balance)} ${val1} 💰`);
    }
  }
});

cmd.hear(/^(?:питомец 2 поход)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    const pet = pets2.find((x) => x.id === message.user.misc.pet2);

    const earn = utils.random(pet.min, pet.max);

    if (message.user.timers.poxod2 > Date.now())
      return bot(
        `вы сможете отправить питомца в поход через ${unixStampLefta(
          message.user.timers.poxod2 - Date.now()
        )} Ваш питомец довольно сильно устал!`
      );

    message.user.sprcoin += earn;

    message.user.timers.poxod2 = Date.now() + 300000;

    return bot(`ваш питомец нашёл в походе ${utils.sp(earn)} SpringCoins ☣.`);
  }
});

cmd.hear(/^(?:питомец 3 поход)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    const pet = pets3.find((x) => x.id === message.user.misc.pet3);

    const earn = utils.random(pet.min, pet.max);

    if (message.user.timers.poxod3 > Date.now())
      return bot(
        `вы сможете отправить питомца в поход через ${unixStampLefta(
          message.user.timers.poxod3 - Date.now()
        )} Ваш питомец довольно сильно устал!`
      );

    message.user.sprcoin += earn;

    message.user.timers.poxod3 = Date.now() + 300000;

    return bot(`ваш питомец нашёл в походе ${utils.sp(earn)} SpringCoins ☣.`);
  }
});


cmd.hear(/^(?:питомец поход)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.misc.pet < 1) return bot(`у Вас нет питомца.`);
    else {
      if (pets[message.user.misc.pet - 1].id === 20) {
        let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

        if (message.user.timers.poxod > Date.now())
          return bot(
            `вы сможете отправить питомца в поход через ${unixStampLefta(
              message.user.timers.poxod - Date.now()
            )} Ваш питомец довольно сильно устал!`
          );

        message.user.timers.poxod = Date.now() + 3600000;

        const pet = pets.find((x) => x.id === message.user.misc.pet);

        const earn = utils.random(pet.min, pet.max) * message.user.pet.lvl;

        if (prize === 1) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 2) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 3) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 4) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 5) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 6) {
          message.user.sprcoin += earn;

          return bot(`ваш питомец нашёл в походе ${utils.sp(
            earn
          )} SpringCoins ☣️. Улучшайте своего питомца!

		`);
        }

        if (prize === 7) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 8) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 9) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }

        if (prize === 10) {
          message.user.sprcoin += earn;

          return bot(
            `ваш питомец нашёл в походе ${utils.sp(
              earn
            )} SpringCoins ☣️. Улучшайте своего питомца!`
          );
        }
      }

      let prize = utils.pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

      if (message.user.timers.poxod > Date.now())
        return bot(
          `вы сможете отправить питомца в поход через ${unixStampLefta(
            message.user.timers.poxod - Date.now()
          )} Ваш питомец довольно сильно устал!`
        );

      const pet = pets.find((x) => x.id === message.user.misc.pet);

      const earn = utils.random(pet.min, pet.max) * message.user.pet.lvl;

      message.user.timers.poxod = Date.now() + 3600000;

      if (prize === 1) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 2) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 3) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 4) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 5) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 6) {
        message.user.balance += earn;

        return bot(`ваш питомец нашёл в походе ${utils.sp(
          earn
        )} ${val1}. Улучшайте своего питомца!

		`);
      }

      if (prize === 7) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 8) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 9) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }

      if (prize === 10) {
        message.user.balance += earn;

        return bot(
          `ваш питомец нашёл в походе ${utils.sp(
            earn
          )} ${val1}. Улучшайте своего питомца!`
        );
      }
    }
  }
});


module.exports = commands;
