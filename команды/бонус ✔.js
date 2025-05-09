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




cmd.hear(/^(?:бонус|🎁 Бонус)$/i, async (message, bot) => {
  try {
    if (message.user.bans.bonus) {
      return bot(`🚫 Вам отключен бонус. 🚫`);
    }

    if (!message.isChat || message.chat.type === 1) {
      await handlePrivateBonus(message, bot);
    } else if (message.chat.type === 2) {
      await handleGroupBonus(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде бонус:", error);
    await bot("⚠️ Произошла ошибка при получении бонуса. Пожалуйста, попробуйте позже.");
  }
});

async function handlePrivateBonus(message, bot) {
  if (message.user.timers.bonus >= Date.now()) {
    return bot(`⏳ Бонус можно будет получить через ${unixStampLefta(message.user.timers.bonus - Date.now())} ⏳`);
  }

  const randbal = utils.random(5000000, 50000000);
  const randrating = utils.random(5, 20);
  const randbank = utils.random(1000000, 5000000);
  const randbtc = utils.random(10, 100);
  const randbil = utils.random(1, 3);
  const randgb = utils.random(100, 1000);

  message.user.timers.bonus = Date.now() + 3600000; 

  const prize = utils.random(1, 6);

  if (!message.user.now.kv1 && message.user.now.kv) { 
    message.user.now.kv1 = true;
    message.user.bilet += 10;
    await bot(`✅ Ты успешно выполнил 1 задание! 
  Награда - 10 билетов 🎟️. 
  
  💡 Не забывай, что каждый час ты можешь забирать бонус и получать призы!`, {
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


  switch (prize) {
    case 1:
      message.user.balance += randbal;
      return bot(`💰 Вы выиграли ${utils.sp(randbal)} ${val1}! 💰`);
    case 2:
      message.user.rating += randrating;
      return bot(`👑 Вы выиграли ${utils.sp(randrating)} рейтинга! 👑\n🏆 Рейтинг: ${utils.sp(message.user.rating)}`);
    case 3:
      message.user.bank += randbank;
      return bot(`🏦 Вы выиграли ${utils.sp(randbank)}$ на свой банковский счёт! 🏦\n💳 Счёт в банке: ${utils.sp(message.user.bank)} ${val1}`);
    case 4:
      message.user.btc += randbtc;
      return bot(`₿ Вы выиграли ${utils.sp(randbtc)} биткоинов! ₿\n🌐 Биткоинов: ${utils.sp(message.user.btc)}₿`);
    case 5:
      message.user.bilet += randbil;
      return bot(`🎟️ Вы выиграли ${utils.sp(randbil)} билетов! 🎟️`);
    case 6:
        message.user.balance2 += randgb;
        return bot(`🎟️ Вы выиграли ${utils.sp(randgb)} ${val4} ! 🎟️`);
    default:
      console.warn("Неизвестный приз:", prize);
      return bot("⚠️ Произошла ошибка при определении приза. Попробуйте позже.");
  }
}

async function handleGroupBonus(message, bot) {
  if (message.user.balance2 > 999999) {
    return bot("🚫 Бонус не начислен, у вас слишком большой баланс. 🚫");
  }

  if (message.user.timers.bonus2 > Date.now()) {
    let timeLeft = unixStampLefta(message.user.timers.bonus2 - Date.now());
    return bot(`⏳ До получения бонуса: ${timeLeft} ⏳`);
  }

  const bonusConfigs = [
    { condition: () => message.user.settings.vip, bonus: 200, name: 'VIP бонус' },
    { condition: () => message.user.settings.premium, bonus: 300, name: 'PREMIUM бонус' },
    { condition: () => message.user.settings.topdon, bonus: 1000, name: 'TOP DONATOR бонус' },
    { condition: () => message.user.settings.adm > 0, bonus: 500, name: 'ADMIN бонус' },
    { condition: () => true, bonus: 100, name: 'бонус' }
  ];

  const validBonuses = bonusConfigs.filter(config => config.condition());

  const bestBonus = validBonuses.reduce((max, config) => config.bonus > max.bonus ? config : max, { bonus: 0, name: 'бонус' });

  await bot(`🎉 ${bestBonus.name}: +${utils.sp(bestBonus.bonus)} GB! 💵`);

  message.user.balance2 += bestBonus.bonus;
  message.user.timers.bonus2 = Date.now() + 1200000; // 20 минут
  message.user.bonusCounter = (message.user.bonusCounter || 0) + 1;
}

cmd.hear(/^(?:бонус император|бонус imperator|imperarot бонус|император бонус)$/i, async (message, bot) => {
  try {
    if (message.user.bans.bonus) {
      return bot(`🚫 Вам отключен бонус. 🚫`);
    }
    if (!message.isChat || message.chat.type === 1) {
      await handleImperatorBonus(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде бонус император:", error);
    await bot("⚠️ Произошла ошибка при получении императорского бонуса. Попробуйте позже.");
  }
});

async function handleImperatorBonus(message, bot) {
  if (!message.user.settings.imperator) return;

  if (message.user.timers.imperatorbonus >= Date.now()) {
    return bot(`👑 Императорский бонус будет доступен через ${unixStampLefta(message.user.timers.imperatorbonus - Date.now())}. 👑`);
  }

  const imperatorbonus1 = utils.random(1, 6);
  message.user.timers.imperatorbonus = Date.now() + 86400000; 

  switch (imperatorbonus1) {
    case 1:
      const bonuscash = utils.random(10000000, 100000000);
      message.user.balance += bonuscash;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonuscash)} ${val1}! 🎉`);
    case 2:
      const bonusbtc = utils.random(1000, 5000);
      message.user.btc += bonusbtc;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusbtc)} ₿! 🎉`);
    case 3:
      const bonusrating = utils.random(10, 65);
      message.user.rating += bonusrating;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`);
    case 4:
      const bonusopit = utils.random(3000, 5000);
      message.user.opit += bonusopit;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`);
    case 5:
      message.user.c3 += 1;
      message.send({ sticker_id: 108235 });
      return bot(`🎉 УХ-ТЫ! Вы выиграли донат-кейсо! 🎁`);
    case 6:
      message.user.c5 += 2;
      message.send({ sticker_id: 108225 });
      return bot(`🎉 ВОТ ЭТО УДАЧА! Вы выиграли 2 супер кейса! 🎁`);
    default:
      console.warn("Неизвестный бонус:", imperatorbonus1);
      return bot("⚠️ Произошла ошибка при определении бонуса. Попробуйте позже.");
  }
}

cmd.hear(/^(?:бонус титан|бонус Titan|Titan бонус|премиум титан)$/i, async (message, bot) => {
  try {
    if (message.user.bans.bonus) {
      return bot(`🚫 Вам отключен бонус. 🚫`);
    }
    if (!message.isChat || message.chat.type === 1) {
      await handleTitanBonus(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде /бонус титан:", error);
    await bot("⚠️ Произошла ошибка при получении титан бонуса. Попробуйте позже.");
  }
});

async function handleTitanBonus(message, bot) {
  if (message.user.settings.titan !== true) return;

  if (message.user.timers.titanbonus > Date.now()) {
    return bot(`⏳ Титан бонус будет доступен через ${unixStampLefta(message.user.timers.titanbonus - Date.now())}. ⏳`);
  }

  const titanbonus1 = utils.random(1, 5);
  message.user.timers.titanbonus = Date.now() + 86400000; // 24 часа

  switch (titanbonus1) {
    case 1:
      const bonuscash = utils.random(0, 0);
      message.user.balance += bonuscash;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonuscash)} ${val1}! 💰`);
    case 2:
      const bonusbtc = utils.random(100, 500);
      message.user.btc += bonusbtc;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusbtc)} ₿! 💎`);
    case 3:
      const bonusrating = utils.random(30, 40);
      message.user.rating += bonusrating;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`);
    case 4:
      const bonusopit = utils.random(300, 3000);
      message.user.opit += bonusopit;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`);
    case 5:
      const bonusbilet = utils.random(1, 4);
      message.user.bilet += bonusbilet;
      return bot(`🎉 Поздравляю! Вы выиграли ${utils.sp(bonusbilet)} билетов! 🎫`);
    default:
      console.warn("Неизвестный титан бонус:", titanbonus1);
      return bot("⚠️ Произошла ошибка при определении титан бонуса. Попробуйте позже.");
  }
}

cmd.hear(/^(?:бонус премиум|бонус PREMIUM|PREMIUM бонус|премиум бонус)$/i, async (message, bot) => {
  try {
    if (message.user.bans.bonus) {
      return bot(`🚫 Вам отключен бонус. 🚫`);
    }
    if (!message.isChat || message.chat.type === 1) {
      await handlePremiumBonus(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде /бонус премиум:", error);
    await bot("⚠️ Произошла ошибка при получении премиум бонуса. Попробуйте позже.");
  }
});

async function handlePremiumBonus(message, bot) {
  if (message.user.settings.premium !== true) return;

  if (message.user.timers.prembonus > Date.now()) {
    return bot(`⏳ Премиум бонус будет доступен через ${unixStampLefta(message.user.timers.prembonus - Date.now())}. ⏳`);
  }

  const premiumbonus = utils.random(1, 5);
  message.user.timers.prembonus = Date.now() + 86400000; // 24 часа

  switch (premiumbonus) {
    case 1:
      const bonuscash = utils.random(5000000, 50000000);
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonuscash)} ${val1}! 💰`);
    case 2:
      const bonusbtc = utils.random(10, 500);
      message.user.btc += bonusbtc;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusbtc)} ₿! 💎`);
    case 3:
      const bonusrating = utils.random(30, 300);
      message.user.rating += bonusrating;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`);
    case 4:
      const bonusopit = utils.random(300, 3000);
      message.user.opit += bonusopit;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`);
    case 5:
      const bonusbilet = utils.random(1, 4);
      message.user.bilet += bonusbilet;
      return bot(`🎉 Поздравляю, вы выиграли ${utils.sp(bonusbilet)} билетов! 🎫`);
    default:
      console.warn("Неизвестный премиум бонус:", premiumbonus);
      return bot("⚠️ Произошла ошибка при определении премиум бонуса. Попробуйте позже.");
  }
}

cmd.hear(/^(?:бонус вип|бонус VIP|VIP бонус|вип бонус)$/i, async (message, bot) => {
  try {
    if (message.user.bans.bonus) {
      return bot(`🚫 Вам отключен бонус. 🚫`);
    }
    if (!message.isChat || message.chat.type === 1) {
      await handleVipBonus(message, bot);
    }
  } catch (error) {
    console.error("Ошибка в команде /бонус вип:", error);
    await bot("⚠️ Произошла ошибка при получении VIP бонуса. Попробуйте позже.");
  }
});

async function handleVipBonus(message, bot) {
  if (message.user.settings.vip !== true) return;

  const timeLeft = message.user.timers.vipbonus - Date.now();
  if (timeLeft > 0) {
    const formattedTime = unixStampLefta(timeLeft);
    return bot(`⏳ Вип бонус будет доступен через ${formattedTime}. ⏳`);
  }

  const vipbonus = utils.random(1, 4);
  message.user.timers.vipbonus = Date.now() + 86400000;

  let bonusMessage, attachment;

  switch (vipbonus) {
    case 1:
      const bonuscash = utils.random(30000000, 300000000);
      message.user.balance += bonuscash;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonuscash)} ${val1}! 💰`;
      attachment = utils.pick([`photo-219408161_457239349`]);
      break;
    case 2:
      const bonusbtc = utils.random(5, 1150);
      message.user.btc += bonusbtc;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonusbtc)}₿! 💎`;
      attachment = utils.pick([`photo-219408161_457239350`]);
      break;
    case 3:
      const bonusrating = utils.random(10, 100);
      message.user.rating += bonusrating;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonusrating)} рейтинга! 👑`;
      attachment = utils.pick([`photo-219408161_457239351`]);
      break;
    case 4:
      const bonusopit = utils.random(100, 1000);
      message.user.opit += bonusopit;
      bonusMessage = `🎉 Поздравляю, вы выиграли ${utils.sp(bonusopit)} опыта! 🏆`;
      attachment = utils.pick([`photo-219408161_457239352`]);
      break;
    default:
      console.warn("Неизвестный VIP бонус:", vipbonus);
      return bot("⚠️ Произошла ошибка при определении VIP бонуса. Попробуйте позже.");
  }

  return bot(bonusMessage, { attachment });
}

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
