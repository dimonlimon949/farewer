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



cmd.hear(
  /^(?:фортуна|🎡 Фортуна|⏲ Фортуна)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
      return bot(
        `Информация о «Фортуне»: ❄️

♻️ ➖ Призы:

1️⃣ Элитные посылки 
2️⃣ Starr Drops
3️⃣ Донат кейсы 
4️⃣ ${val1}
5️⃣ Билеты
6️⃣ VIP Статус 
7️⃣ ${val4}
8️⃣ Опыт


🔹 Стоимость прокрута: 10 билетов 🎫
`,
        { attachment: `photo-211261524_457239021`,

            keyboard: JSON.stringify({
              inline: true,
    
              buttons: [
                [
                  {
                    action: {
                      type: "text",
    
                      payload: JSON.stringify({ command: `фортуна ебать` }),
    
                      label: "🎡💵 Крутить",
                    },
    
                    color: "default",
                  },
                ],
    
              ],
            }),
       }
      );
    }
  }
);

cmd.hear(/^(?:фортуна ебать)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let prize = utils.random(1, 8);

    if (message.user.bilet < 10)
      return bot(`недостаточно билетов для прокрута Фортуны! 🎡❌`);

    let randsmile = utils.pick(["😸", "🙃", "😃", "😁"]);

    if (prize === 1) {
      let randpos = utils.random(1, 3);

      message.user.bilet -= 10;

      message.user.possilka2 += randpos;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпало элитная(-ые) посылку(-и) (Х${randpos}) 📦! ${randsmile}`,
        { attachment: `photo-211261524_457239022`,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }),
        }
      );
    }

    if (prize === 2) {
      message.user.bilet -= 10;

      message.user.c4 += 1;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпал Starr Drops! ${randsmile}`,
        { attachment: `photo-211261524_457239023`,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }), }
      );
    }

    if (prize === 3) {
      let valuta = utils.random(1, 2);

      message.user.bilet -= 10;

      message.user.c3 += valuta;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпало донат-кейс(-ы, -ов) (Х${valuta}) 📦! ${randsmile}`,
        { attachment: `photo-211261524_457239027`,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }), }
      );
    }

    if (prize === 4) {
      let randpos = utils.random(1000000, 50000000);

      message.user.bilet -= 10;

      message.user.balance += randpos;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпало ${randpos} ${val1}! ${randsmile}`,
        { attachment: `photo-211261524_457239022` ,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }),}
      );
    }

    if (prize === 5) {
      let randpos = utils.random(1, 10);

      message.user.bilet -= 10;

      message.user.bilet += randpos;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпало ${randpos} билетов ! ${randsmile}`,
        { attachment: `photo-211261524_457239022`,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }), }
      );
    }

    if (prize === 6) {
      message.user.bilet -= 10;

      if (message.user.settings.vip !== false) {
        message.user.bilet += 10;

        return message.send(
          `🎡 @id${message.user.id} (${message.user.tag}), вам выпал «VIP» статус! 😲\n▶️ Вы уже имеете статус «VIP», выдана компенсация в виде возврата 10-ти билетов 🎫 ${randsmile}`,
          { attachment: `photo-211261524_457239026`,
            keyboard: JSON.stringify({
              inline: true,
    
              buttons: [
                [
                  {
                    action: {
                      type: "text",
    
                      payload: JSON.stringify({ command: `фортуна ебать` }),
    
                      label: "🎡💵 Крутить",
                    },
    
                    color: "default",
                  },
                ],
    
              ],
            }), }
        );
      }

      if (
        message.user.settings.premium !== false ||
        message.user.settings.titan !== false
      ) {
        message.user.settings.vip = true;

        return bot("Вы выиграли VIP статус!💡");
      }

      message.user.settings.vip = true;

      message.user.stock.status = "VIP";

      message.user.limit.nicklimit = 21;

      message.user.level += 5;

      message.user.limit.banklimit = 100000000000000;

      message.user.limit.farmlimit = 3000;

      message.user.limit.videocardlimit = 50;

      message.user.limit.playerlimit = 100000000000000;

      message.user.limit.sent = 0;

      message.user.maxenergy = 20;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпал «VIP» Статус! 😲\n🔥 Для ознакомления с командами введите «VIP help» ${randsmile}`,
        { attachment: `photo-211261524_457239026`,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }), }
      );
    }

    if (prize === 7) {
      let randpos = utils.random(1, 20000);

      message.user.bilet -= 10;

      message.user.balance2 += randpos;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпало ${randpos} ${val4} ! ${randsmile}`,
        { attachment: `photo-211261524_457239022`,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }), }
      );
    }

    if (prize === 8) {
      let randpos = utils.random(10, 2000);

      message.user.bilet -= 10;

      message.user.opit += randpos;

      return message.send(
        `🎡 @id${message.user.id} (${message.user.tag}), вам выпало ${randpos}) опыта! ${randsmile}`,
        { attachment: `photo-211261524_457239022`,
          keyboard: JSON.stringify({
            inline: true,
  
            buttons: [
              [
                {
                  action: {
                    type: "text",
  
                    payload: JSON.stringify({ command: `фортуна ебать` }),
  
                    label: "🎡💵 Крутить",
                  },
  
                  color: "default",
                },
              ],
  
            ],
          }), }
      );
    }




  }
});







module.exports = commands;
