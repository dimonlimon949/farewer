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



cmd.hear(new RegExp(`^(?:обмен ${val2}|обменник|о|🛑 Обмен ${val2})$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type == 1) {
    utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]);
    return bot(`Обмен ${val2}:

🏆 ➖ Привилегии
1&#8419; Titan | 10.000 ${val2}
2&#8419; Premium | 5.500 ${val2}
3&#8419; VIP | 1.000 ${val2}

📦 ➖ Кейсы
4&#8419; Донат-кейс | 150 ${val2}

💰 ➖ Валюта
5&#8419; 350.000.000 ${val1} | 349 ${val2}
6&#8419; 300.000.000 ${val1} | 299 ${val2}
7&#8419; 100.000.000 ${val1} | 100 ${val2}
8&#8419; 20.000.000 ${val1} | 20 ${val2}
9&#8419; 15.000.000 ${val1}  | 15 ${val2}
1&#8419;0&#8419; 10.000.000 ${val1} | 10 ${val2}
1&#8419;1&#8419; 5.000.000 ${val1} | 5 ${val2}
1&#8419;2&#8419; 3.000.000 ${val1} | 3 ${val2}

💬 ➖ Другое
1&#8419;3&#8419; Киностудия - 3.000.000 ${val1}/час | 2.999 ${val2}
1&#8419;4&#8419; Длинный ник | 14 ${val2}

🌟 ➖ Новинки
1&#8419;5&#8419; Донатный Гигант - 30 ${val2}/час | 15.000 ${val2}
1&#8419;6&#8419; TITAN VIP | 25.000 ${val2}

📦 ➖ Посылки
1&#8419;7&#8419; Денежная посылка | 250 ${val2}
1&#8419;8&#8419; Элитная посылка | 1.000 ${val2}
1&#8419;9&#8419; Премиум посылка | 5.000 ${val2}

💵 ➖ Баланс: ${utils.sp(message.user.rub)} ${val2}

🛒 Для покупки введите "${val2} [номер]".`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 1)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {

    if (30000 > message.user.rub) return bot(`недостаточно ${val2}й. ⛔`);

    if (message.user.settings.titan == true) return bot(`у вас уже имеется данный товар. ✅`);

    message.user.rub -= 10000;
    message.user.settings.titan = true;
    message.user.bantop = true;
    message.user.stock.status = 'TITAN';

    return message.send(`▶️ Успешная покупка! -10.000 ${val2} 💰\n🎉 Поздравляем, Вы приобрели TITAN.`);

  }
  });

cmd.hear(new RegExp(`^(?:${val2} 2)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (1499 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.settings.premium) return bot(`у вас уже имеется статус [Premium]. ✅`);

    if (!message.user.settings.premium) {

      message.user.settings.premium = true;

      message.user.rub -= 5500;

      return message.send(`▶️ Успешная покупка! -5.500 ${val2} 💰\n🎉 Поздравляем, Вы приобрели статус «PREMIUM»! 🎊\n\n💬 Ознакомиться со списком всех доступных команд можно по команде «Premium help» 🤗`);

    } 
  }

});



cmd.hear(new RegExp(`^(?:${val2} 3)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (1149 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.settings.vip) return bot(`у вас уже имеется статус [VIP]. ✅`);

    if (!message.user.settings.vip) {

      message.user.settings.vip = true;

      message.user.rub -= 1000;

      return message.send(`▶️ Успешная покупка! -1.000 ${val2} 💰\n🎉 Поздравляем, Вы приобрели статус «VIP»! 🎊\n\n💬 Ознакомиться со списком всех доступных команд можно по команде «VIP help» 🤗`);

    }
  }

});

cmd.hear(new RegExp(`^(?:${val2} 4)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {

    if (150 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.c3 += 1

    message.user.rub -= 150

    return message.send(`▶️ Успешная покупка! -150 ${val2} 💰\n\n💬 Донат-кейс уже начислен на Ваш аккаунт. 📦`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 5)$`, 'i'), async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

    if (149 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 149;

    message.user.balance += 350000000;



    return message.send(`▶️ Успешная покупка! -149 ${val2} 💰\n\n💵 +350.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 6)$`, 'i'), async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {

    if (299 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 299;

    message.user.balance += 300000000;



    return message.send(`▶️ Успешная покупка! -299 ${val2} 💰\n\n💵 +300.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 7)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (100 > message.user.rub) return bot(`недостаточно Чако-рублей. ⛔`);



    message.user.rub -= 100;

    message.user.balance += 100000000;



    return message.send(`▶️ Успешная покупка! -100 ${val2} 💰\n\n💵 +100.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 8)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (20 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 20;

    message.user.balance += 20000000;



    return message.send(`▶️ Успешная покупка! -20 ${val2} 💰\n\n💵 +20.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 9)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (15 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 15;

    message.user.balance += 15000000;



    return message.send(`▶️ Успешная покупка! -15 ${val2} 💰\n\n💵 +15.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 10)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (10 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 10;

    message.user.balance += 50000000;



    return message.send(`▶️ Успешная покупка! -10 ${val2} 💰\n\n💵 +50.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 11)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (5 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 5;

    message.user.balance += 15000000;



    return message.send(`▶️ Успешная покупка! -5 ${val2} 💰\n\n💵 +15.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 12)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    if (3 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 3;

    message.user.balance += 50000000;



  return message.send(`▶️ Успешная покупка! -3 ${val2} 💰\n\n💵 +5.000.000 ${val1} уже начислены на Ваш баланс! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 13)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (2999 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.business.length >= 3) return bot(`у вас уже есть 3 бизнеса`);



    message.user.rub -= 2999;

    message.user.business2.push({

      "id": 16,

      "upgrade": 1,

      "workers": 7500,

      "moneys": 0

    });



      return message.send(`▶️ Успешная покупка! -2999 ${val2} 💰\n\n🎥 Бизнес «Киностудия по всему миру» выдана на Ваш аккаунт! 🎉`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 14)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (14 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    if (message.user.nicklimit > 31) return bot(`у вас уже имеется данный товар. ✅`);



    message.user.rub -= 14;

    message.user.nicklimit = 32;



    return message.send(`▶️ Успешная покупка! -14 ${val2} 💰\n\n💬 Вы приобрели длинный ник-нейм, теперь его длина составляет 32 символа. 🔥`);
  }
});



cmd.hear(new RegExp(`^(?:${val2} 15)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.stars5) return bot(`Вы уже купили данную звезду ❌`);

    if (message.user.rub >= 15000) {

      message.user.stars5 = true;

      message.user.rub -= 15000;

      return message.send(`▶️ Успешная покупка! -15.000 ${val2} 💰\n\n⭐ Звезда «Донатный гигант» выдана на Ваш аккаунт! 🎉`);

    } else {

      return bot(`недостаточно ${val2}. ⛔`);

    }


  }
});

cmd.hear(new RegExp(`^(?:${val2} 16)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (25000 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);



    message.user.rub -= 25000;

    message.user.settings.titan = true;

    message.user.limit.nicklimit = 48;

    message.user.level += 50;

    message.user.opit += 50000;

    message.user.limit.banklimit = 500000000000000;

    message.user.limit.farmlimit = 10000;

    message.user.limit.playerlimit = 300000000000000;

    message.user.limit.sent = 0;

    message.user.maxenergy = 100;



    return message.send(`▶️ Успешная покупка! -25.000 ${val2} 💰\n🎉 Поздравляем, Вы приобрели статус «TITAN»! 🎊\n\n💬 Ознакомиться со списком всех доступных команд можно по команде «TITAN help» 🤗`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 17)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (250 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.possilka1 += 1;

    message.user.rub -= 250;

    return message.send(`▶️ Успешная покупка! -250 ${val2} 💰\n\n📦 Денежная посылка уже выдана на Ваш аккаунт. Открыть: «посылка открыть 1» 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 18)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (1000 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.possilka2 += 1;

    message.user.rub -= 1000;

    return message.send(`▶️ Успешная покупка! -1000 ${val2} 💰\n\n📦 Элитная посылка уже выдана на Ваш аккаунт. Открыть: «посылка открыть 2» 🎉`);
  }
});

cmd.hear(new RegExp(`^(?:${val2} 19)$`, 'i'), async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (5000 > message.user.rub) return bot(`недостаточно ${val2}. ⛔`);

    message.user.possilka3 += 1;

    message.user.rub -= 5000;

    return message.send(`▶️ Успешная покупка! -5000 ${val2} 💰\n\n📦 Премиум посылка уже выдана на Ваш аккаунт. Открыть: «посылка открыть 3» 🎉`);
  }

});


cmd.hear(/^(?:📈 Обмен|Обмен)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    await bot(`💰 Обменник ${val4}

💱 Валюта

1⃣ 1.000 ${val4} ➜ 20.000.000 ${val1}

🎁 Starr Drop

2⃣ 150.000 ${val4} ➜ Starr Drop

💵 Донат – Рубли

3⃣ 1.000.000 ${val4} ➜ 10 рублей

💳 Обмен на ${val4}

4⃣ 60.000.000 ${val1} ➜ 1.000 ${val4}
5⃣ 1.000 ${val2} ➜ 10.000 ${val4}
6⃣ 1 билет ➜ 5.000 ${val4}


📊 Ваш баланс валют:

💰 Баланс: ${utils.sp(message.user.balance)} ${val1}

💸 Баланс: ${utils.sp(message.user.rubli)} рублей

🎟️ Баланс: ${utils.sp(message.user.bilet)} билетов

💸 Баланс: ${utils.sp(message.user.rub)} ${val2}ов

💾 Баланс: ${utils.sp(message.user.balance2)} ${val4}

🛒 Для покупки введите "Обмен [номер] [кол-во]"`)
  }
})

cmd.hear(/^(?:Обмен 1)(?: (\d+))?$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    // Количество обменов, по умолчанию 1
    const count = message.args[1] ? Math.max(1, Math.min(100, Number(message.args[1]))) : 1;

    const costPerExchange = 1000; // Стоимость одного обмена
    const gainPerExchange = 40000000; // Прибыль от одного обмена

    const totalCost = costPerExchange * count; // Общая стоимость
    const totalGain = gainPerExchange * count; // Общая прибыль


    if (message.user.balance2 < costPerExchange) {
   return bot(`недостаточно  ${val4}`)
    }

    if (message.user.balance2 < totalCost) {
      // Рассчитываем максимальное количество обменов, которое можно сделать
      const maxExchanges = Math.floor(message.user.balance2 / costPerExchange);
      return bot(`Недостаточно ${val4} для выполнения обмена. Вам нужно ${totalCost.toLocaleString()} ${val4}. ⛔\n\nВы можете выполнить максимум ${maxExchanges} обменов.`, {
        keyboard: JSON.stringify({
          "inline": true,
          "buttons": [
            [{
              "action": {
                "type": "text",
                "payload": "{}",
                "label": `Обмен 1 ${maxExchanges}`
              },
              "color": "default"
            }]
          ]
        })
      });
    }

    message.user.balance += totalGain; // Увеличиваем баланс пользователя
    message.user.balance2 -= totalCost; // Уменьшаем баланс пользователя



    return message.send(`▶️ Успешная покупка! -${totalCost.toLocaleString()} ${val4} 💰\n\n🎉 Всего получено: ${totalGain.toLocaleString()} ${val1}`);
  }
});

cmd.hear(/^(?:Обмен 2)\s+(\d+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
      const count = Number(message.args[1]); // Изменено на message.args[1]



      const costPerExchange = 150000; // Стоимость одного обмена в val4
      const gainPerExchange = 1; // Прибыль от одного обмена в Starr Drop (c4)

      const totalCost = costPerExchange * count; // Общая стоимость
      const totalGain = gainPerExchange * count; // Общая прибыль

      // Проверка баланса пользователя
      if (message.user.balance2 < costPerExchange) {
          return bot(`Недостаточно ${val4}`);
      }

      if (message.user.balance2 < totalCost) {
          // Рассчитываем максимальное количество обменов, которое можно сделать
          const maxExchanges = Math.floor(message.user.balance2 / costPerExchange);
          return bot(`Недостаточно ${val4} для выполнения обмена. Вам нужно ${totalCost.toLocaleString()} ${val4}. ⛔\n\nВы можете выполнить максимум ${maxExchanges} обменов.`, {
              keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                      [{
                          "action": {
                              "type": "text",
                              "payload": "{}",
                              "label": `Обмен 2 ${maxExchanges}`
                          },
                          "color": "default"
                      }]
                  ]
              })
          });
      }

      // Выполнение обмена
      message.user.c4 += totalGain; // Увеличиваем баланс пользователя в Starr Drop
      message.user.balance2 -= totalCost; // Уменьшаем баланс пользователя в val4



      return message.send(`▶️ Успешная покупка! -${totalCost.toLocaleString()} ${val4} 💰\n\n🎉 Всего получено: ${totalGain.toLocaleString()} Starr Drop`);
  }
});

cmd.hear(/^(?:Обмен 3)\s+(\d+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
      const count = Number(message.args[1]); // Получаем количество обменов из второго аргумента



      const costPerExchange = 1000000; // Стоимость одного обмена в val4
      const gainPerExchange = 10; // Прибыль от одного обмена в рублях

      const totalCost = costPerExchange * count; // Общая стоимость в val4
      const totalGain = gainPerExchange * count; // Общая прибыль в рублях

      // Проверка баланса пользователя
      if (message.user.balance2 < totalCost) {
          // Рассчитываем максимальное количество обменов, которое можно сделать
          const maxExchanges = Math.floor(message.user.balance2 / costPerExchange);
          return bot(`Недостаточно val4 для выполнения обмена. Вам нужно ${totalCost.toLocaleString()} ${val4}. ⛔\n\nВы можете выполнить максимум ${maxExchanges} обменов.`, {
              keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                      [{
                          "action": {
                              "type": "text",
                              "payload": "{}",
                              "label": `Обмен 3 ${maxExchanges}`
                          },
                          "color": "default"
                      }]
                  ]
              })
          });
      }

      // Выполнение обмена
      message.user.balance2 -= totalCost; // Уменьшаем баланс пользователя в val4
      message.user.rubli += totalGain; // Увеличиваем баланс пользователя в рублях



      return message.send(`▶️ Успешная покупка! -${totalCost.toLocaleString()} val4 💰\n\n🎉 Всего получено: ${totalGain.toLocaleString()} рублей`);
  }
});

cmd.hear(/^(?:Обмен 4)\s+(\d+)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        const count = parseInt(message.args[1], 10); // Получаем количество обменов из второго аргумента и преобразуем в число

        if (isNaN(count) || count <= 0) {
            return message.send("Пожалуйста, укажите корректное количество обменов. ❗");
        }

        const costPerExchange = 60000000; // Стоимость одного обмена в val1
        const gainPerExchange = 1000; // Прибыль от одного обмена в val4

        const totalCost = costPerExchange * count; // Общая стоимость в val1
        const totalGain = gainPerExchange * count; // Общая прибыль в val4

        // Проверка баланса пользователя
        if (message.user.balance < totalCost) {
            // Рассчитываем максимальное количество обменов, которое можно сделать
            const maxExchanges = Math.floor(message.user.balance / costPerExchange);
            return bot(`Недостаточно ${val1} для выполнения обмена. Вам нужно ${totalCost.toLocaleString()} ${val1}. ⛔\n\nВы можете выполнить максимум ${maxExchanges} обменов.`, {
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                "payload": "{}",
                                "label": `Обмен 4 ${maxExchanges}`
                            },
                            "color": "default"
                        }]
                    ]
                })
            });
        }

        // Выполнение обмена
        message.user.balance -= totalCost; // Уменьшаем баланс пользователя в val1
        message.user.balance2 += totalGain; // Увеличиваем баланс пользователя в val4


        return message.send(`▶️ Успешная покупка! -${totalCost.toLocaleString()} ${val1} 💰\n\n🎉 Всего получено: ${totalGain.toLocaleString()} ${val4}`);
    }
});

cmd.hear(/^(?:Обмен 5)\s+(\d+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
      const count = Number(message.args[1]); // Получаем количество обменов из второго аргумента



      const costPerExchange = 1000; // Стоимость одного обмена в val2
      const gainPerExchange = 10000; // Прибыль от одного обмена в val4

      const totalCost = costPerExchange * count; // Общая стоимость в val2
      const totalGain = gainPerExchange * count; // Общая прибыль в val4

      // Проверка баланса пользователя
      if (message.user.rub < totalCost) {
          // Рассчитываем максимальное количество обменов, которое можно сделать
          const maxExchanges = Math.floor(message.user.rub / costPerExchange);
          return bot(`Недостаточно ${val2} для выполнения обмена. Вам нужно ${totalCost.toLocaleString()} ${val2}. ⛔\n\nВы можете выполнить максимум ${maxExchanges} обменов.`, {
              keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                      [{
                          "action": {
                              "type": "text",
                              "payload": "{}",
                              "label": `Обмен 5 ${maxExchanges}`
                          },
                          "color": "default"
                      }]
                  ]
              })
          });
      }

      // Выполнение обмена
      message.user.rub -= totalCost; // Уменьшаем баланс пользователя в val2
      message.user.balance2 += totalGain; // Увеличиваем баланс пользователя в val4


      return message.send(`▶️ Успешная покупка! -${totalCost.toLocaleString()} ${val2} 💰\n\\n🎉 Всего получено: ${totalGain.toLocaleString()} ${val4}`);
  }
});

cmd.hear(/^(?:Обмен 6)\s+(\d+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
      const count = Number(message.args[1]); // Получаем количество обменов из второго аргумента



      const costPerExchange = 1; // Стоимость одного обмена в билетах
      const gainPerExchange = 5000; // Прибыль от одного обмена в val4

      const totalCost = costPerExchange * count; // Общая стоимость в билетах
      const totalGain = gainPerExchange * count; // Общая прибыль в val4

      // Проверка баланса пользователя
      if (message.user.bilet < totalCost) {
          // Рассчитываем максимальное количество обменов, которое можно сделать
          const maxExchanges = Math.floor(message.user.bilet / costPerExchange);
          return bot(`Недостаточно билетов для выполнения обмена. Вам нужно ${totalCost.toLocaleString()} билет(ов). ⛔\n\nВы можете выполнить максимум ${maxExchanges} обменов.`, {
              keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                      [{
                          "action": {
                              "type": "text",
                              "payload": "{}",
                              "label": `Обмен 6 ${maxExchanges}`
                          },
                          "color": "default"
                      }]
                  ]
              })
          });
      }

      // Выполнение обмена
      message.user.bilet -= totalCost; // Уменьшаем баланс пользователя в билетах
      message.user.balance2 += totalGain; // Увеличиваем баланс пользователя в val4


      return message.send(`▶️ Успешная покупка! -${totalCost.toLocaleString()} билет(ов) 💰\n\n🎉 Всего получено: ${totalGain.toLocaleString()} ${val4}`);
  }
});



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
