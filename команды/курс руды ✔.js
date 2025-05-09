let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let botinfo = require('../database/botinfo.json')

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


const tokenData = getToken();

const chatlogi = tokenData.chatlogi; 
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 



function unixStampLefta(stampa) {
  stampa = stampa / 1000;
  let s = stampa % 60;
  stampa = (stampa - s) / 60;
  let m = stampa % 60;
  let text = ``;
  if (m > 0) text += addZero(Math.floor(m)) + " мин. ";
  if (s > 0) text += addZero(Math.floor(s)) + " сек.";
  return text;
}

function addZero(i) {
  return i < 10 ? "0" + i : i;
}

let kursrudtime = Date.now() + 301000;

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

cmd.hear(/^(?:Курс руды|💎 Курс руды)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let text = `Курс руды:\n`;

    if (botinfo.kursplazma > 1400000)
      text += `🆙 Руду «Плазма» сейчас можно продать за дорого.\n`;

    if (botinfo.kursobsidian > 1100000)
      text += `🆙 Руду «Обсидиан» сейчас можно продать за дорого.\n`;

    if (botinfo.kursmateria > 1000000)
      text += `🆙 Руду «Материя» сейчас можно продать за дорого.\n`;

    if (botinfo.kursalmaz > 700000)
      text += `🆙 Руду «Алмаз» сейчас можно продать за дорого.\n`;

    if (botinfo.kurszoloto > 300000)
      text += `🆙 Руду «Золото» сейчас можно продать за дорого.\n`;

    if (botinfo.kurszhelezo > 100000)
      text += `🆙 Руду «Железо» сейчас можно продать за дорого.\n`;

    text += `\n⚙️ 1 железо - ${utils.sp(botinfo.kurszhelezo)} ${val1}`;

    text += `\n🏵 1 золото - ${utils.sp(botinfo.kurszoloto)} ${val1}`;

    text += `\n💎 1 алмаз - ${utils.sp(botinfo.kursalmaz)} ${val1}`;

    text += `\n🌌 1 материя - ${utils.sp(botinfo.kursmateria)} ${val1}`;

    text += `\n🌌 1 обсидиан - ${utils.sp(botinfo.kursobsidian)} ${val1}`;

    text += `\n🌌 1 плазма - ${utils.sp(botinfo.kursplazma)} ${val1}`;

    text += `\n\n🔄 Курс руды обновится через ${unixStampLefta(
      kursrudtime - Date.now()
    )} ⏳`;

    return bot(text);
  }
});

setInterval(() => {
  if (kursrudtime > Date.now()) {
    kursrudtime -= 1;
  }
  if (kursrudtime <= Date.now()) {
    kursrudtime = Date.now() + 301000;
  }
}, 1000);


module.exports = commands;
