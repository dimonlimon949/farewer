let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')



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

let chats = require('../database/chats.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';
let bossinfo = require('../database/bossinfo.json');

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
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

cmd.hear(/^(?:😈 Босс|босс)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.sataka >= 700 && message.user.questbosspower === false) {
      await bot(
        `Ваша сила больше 700, вы получаете бонус за свою силу в виде 25О.ООО.ООО $`
      );

      message.user.balance += 2500000000;

      message.user.questbosspower = true;
    }

    utils.pick([`🌷`, `🌸`, `🌹`, `🌺`, `🌼`, `💐`, `❤️`, `💓`, `💕`]); //utils.pick([`🎅`, `☃️`, `❄️`, `🎄`]);

    return bot(
      `босс «${bossinfo.boss_name}» ❄️

💚 Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)}
🗡️ Нанесено урона: ${utils.sp(message.user.bossyr)} ед.
💪 Ваша сила: ${utils.sp(message.user.sataka)}
➖➖➖➖➖➖➖
♻️ Увеличить силу удара: «босс сила [кол-во]»
▶️ Стоимость: ${utils.sp(50000000000 * message.user.sataka)}$ 💵
👊 Ударить босса: «босс атака [кол-во]»

🔝 ТОП игроков по урону: «босс топ»`,

      {
        attachment: `${bossinfo.photo}`,

        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "👊 Босс сила",
                },

                color: "default",
              },

              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "⚔ Атака",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "😈 Босс топ",
                },

                color: "default",
              },
            ],
          ],
        }),
      }
    );
  }
});

cmd.hear(/^(?:босс сила)\s([0-9]+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {


    //return bot(`В данный момент функция недоступна`);
 
    if(Number(Number(message.user.sataka) + Number(message.args[1])) > 1500) return bot( `превышен лимит прокачки силы.💯 - ${Number(Number(message.user.sataka) + Number(message.args[1]))}`);

    let one = Number(
      ((50000000 + 50000000 * (message.user.sataka - 1)) *
        message.user.sataka) /
      2
    );

    let two = Number(
      ((50000000 + 50000000 * (message.user.sataka + Number(message.args[1]) - 1)) *
        (message.user.sataka + Number(message.args[1]))) /
      2
    );

    let three = Number(Number(two) - Number(one));

    if (message.user.balance < Number(three)) return bot("недостаточно денег.");

    message.user.sataka += Number(message.args[1]);

    message.user.balance -= Number(three);

    if (message.user.sataka >= 700 && message.user.questbosspower === false) {
      await bot(
        `Ваша сила больше 700, вы получаете бонус за свою силу в виде 2.ООО.ООО.OOO ${val1}`
      );

      message.user.balance += 2000000000;

      message.user.questbosspower = true;
    }

    return bot(
      `сила Вашей атаки была повышена на ${utils.sp(
        message.args[1]
      )} ед. за ${utils.sp(three)} ${val1} 💵👊
💰 Баланс: ${utils.sp(message.user.balance)} ${val1}`,

      {
        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "👊 Босс сила",
                },

                color: "positive",
              },
            ],
          ],
        }),
      }
    );
  }
});

//кнопка

cmd.hear(/^(?:босс атака)\s([0-9]+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (bossinfo.boss < 1)
      return bot(`босс мертв, следите за новостями в группе. 👊`);
    if (message.user.settings.adm >= 2)
      return bot(
        `Любимой администрации запрещено повышать силу в целях защиты нашего босса 💚`
      );

    if (message.isChat) {
      if (chats) {
        const chat = chats.find(chat => chat.id === message.chatId);
        if (chat) {
          if (chat.statuemsglvl >= 3) {
            if (message.user.energy < message.args[1]) {
              message.send({
                sticker_id: utils.pick([108227, 108218, 52986, 110673, 110695]),
              });

              return bot(
                `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
              );
            }
        
          } else {
            if (message.user.energy < 2 * message.args[1]) {
              message.send({
                sticker_id: utils.pick([108227, 108218, 52986, 110673, 110695]),
              });

              return bot(
                `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
              );
            }
          }
        }
      }
    } else {
      if (message.user.energy < 2 * message.args[1]) {
        message.send({
          sticker_id: utils.pick([108227, 108218, 52986, 110673, 110695]),
        });

        return bot(
          `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
        );
      }
    }

    let mn;

    if (message.isChat) {
      const chat = chats.find(chat => chat.id === message.chatId);
      if (chat) {
        if (chat.statuepeoplelvl >= 4) {
          mn = 1.25;
        } else {
          mn = 1;
        }
      }
    
    } else {
      mn = 1;
    }





    if (typeof message.user.questdamagedealer === "number") {
      message.user.questdamagedealer += Math.floor(
        Math.round(message.user.sataka * message.args[1] * mn)
      );

      if (message.user.questdamagedealer >= 250000) {
        message.user.questdamagedealer = true;

        await bot(
          `Поздравляем, Вы нанесли боссу 250.000 урона и с почетом получаете 5О.ООО.ООО.ООО.ООО$`
        );

        message.user.balance += 50000000000000;
      }
    }

    if (
      typeof message.user.questdamagedealer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questdamagedealer2 += Math.floor(
        Math.round(message.user.sataka * message.args[1] * mn)
      );

      if (message.user.questdamagedealer2 >= 1000000) {
        message.user.questdamagedealer2 = true;

        await bot(
          `Поздравляем, Вы нанесли боссу 1.000.000 урона и с почетом получаете 1О.ООО.ООО${val1}`
        );

        message.user.balance += 10000000;
      }
    }

    message.user.bossyr += Math.floor(
      Math.round(message.user.sataka * message.args[1] * mn)
    );

    bossinfo.boss -= Math.floor(
      Math.round(message.user.sataka * message.args[1] * mn)
    );

    if (message.isChat) {

      const chat = chats.find(chat => chat.id === message.chatId);
      if (chat) {
        if (chat.statuemsglvl >= 3) {
          message.user.energy -= message.args[1];
        } else {
          message.user.energy -= 2 * message.args[1];
        }
      }
    } else {
      message.user.energy -= 2 * message.args[1];
    }

    if (message.user.energy > 2) {
      return bot(
        `вы нанесли боссу ${utils.sp(
          Math.floor(Math.round(message.user.sataka * message.args[1] * mn))
        )} урона! 👊🗡️
❤ Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)} 💚
⚡ Ваша энергия: ${message.user.energy} ед.`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⚔ Атака",
                  },

                  color: "positive",
                },

                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "😈 Босс топ",
                  },

                  color: "secondary",
                },
              ],
            ],
          }),
        }
      );
    }

    if (message.user.energy === 2) {
      return bot(
        `вы нанесли боссу ${utils.sp(
          Math.floor(Math.round(message.user.sataka * message.args[1] * mn))
        )} урона! 👊🗡️
❤ Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)} 💚
⚡ Ваша энергия: ${message.user.energy} ед.`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⚔ Атака",
                  },

                  color: "positive",
                },

                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "😈 Босс топ",
                  },

                  color: "secondary",
                },
              ],
            ],
          }),
        }
      );
    }

    if (message.user.energy < 2) {
      return bot(
        `вы нанесли боссу ${utils.sp(
          Math.floor(Math.round(message.user.sataka * message.args[1] * mn))
        )} урона! 👊🗡️
❤ Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)} 💚
⚡ Ваша энергия кончилась! ⛔`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⚔ Атака",
                  },

                  color: "negative",
                },

                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "😈 Босс топ",
                  },

                  color: "secondary",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

cmd.hear(/^(?:босс атака|⚔ Атака)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.adm >= 2)
      return bot(
        `Любимой администрации запрещено атаковать в целях защиты нашего босса 💚`
      );

    if (message.isChat) {
      const chat = chats.find(chat => chat.id === message.chatId);
      if (chat) {
        if (chat.statuemsglvl >= 3) {
          if (message.user.energy < 1) {
            message.send({
              sticker_id: utils.pick([108227, 108218, 52986, 110673, 110695]),
            });

            return bot(
              `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
            );
          }
        } else {
          if (message.user.energy < 2) {
            message.send({
              sticker_id: utils.pick([108227, 108218, 52986, 110673, 110695]),
            });

            return bot(
              `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
            );
          }
        }
      }
    } else {
      if (message.user.energy < 2) {
        message.send({
          sticker_id: utils.pick([108227, 108218, 52986, 110673, 110695]),
        });

        return bot(
          `у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`
        );
      }
    }

    let mn;

    if (message.isChat) {
      const chat = chats.find(chat => chat.id === message.chatId);
      if (chat) {
        if (chat.statuepeoplelvl >= 4) {
          mn = 1.25;
        } else {
          mn = 1;
        }
      }
    } else {
      mn = 1;
    }

    if (bossinfo.boss < 1)
      return bot(`босс мёртв! ❌\n♻️ Следите за новостями в группе! 🙂`);

    if (typeof message.user.questdamagedealer === "number") {
      message.user.questdamagedealer += message.user.sataka;

      if (message.user.questdamagedealer >= 250000) {
        message.user.questdamagedealer = true;

        await bot(
          `поздравляем, вы нанесли боссу 250.000 урона и с почетом получаете 50трлн$ :3`
        );

        message.user.balance += 50000000000000;
      }
    }

    if (
      typeof message.user.questdamagedealer2 === "number" &&
      message.user.questallfucker === true
    ) {
      message.user.questdamagedealer2 += message.user.sataka;

      if (message.user.questdamagedealer2 >= 1000000) {
        message.user.questdamagedealer2 = true;

        await bot(
          `поздравляем, вы нанесли боссу 1.000.000 урона и с почетом получаете 100трлн$ :3`
        );

        message.user.balance += 100000000000000;
      }
    }

    message.user.bossyr += Math.floor(Math.round(message.user.sataka * mn));

    bossinfo.boss -= Math.floor(Math.round(message.user.sataka * mn));

    if (message.isChat) {
      const chat = chats.find(chat => chat.id === message.chatId);
      if (chat) {
        if (chat.statuemsglvl >= 3) {
          message.user.energy -= 1;
        } else {
          message.user.energy -= 2;
        }
      }
    } else {
      message.user.energy -= 2;
    }

    if (message.user.energy > 2) {
      return bot(
        `вы нанесли боссу ${utils.sp(
          Math.floor(Math.round(message.user.sataka * mn))
        )} урона! 👊🗡️
❤ Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)} 💚
⚡ Ваша энергия: ${message.user.energy} ед.`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⚔ Атака",
                  },

                  color: "positive",
                },

                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "😈 Босс топ",
                  },

                  color: "secondary",
                },
              ],
            ],
          }),
        }
      );
    }

    if (message.user.energy === 2) {
      return bot(
        `вы нанесли боссу ${utils.sp(
          Math.floor(Math.round(message.user.sataka * mn))
        )} урона! 👊🗡️
❤ Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)} 💚
⚡ Ваша энергия: ${message.user.energy} ед.`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⚔ Атака",
                  },

                  color: "positive",
                },

                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "😈 Босс топ",
                  },

                  color: "secondary",
                },
              ],
            ],
          }),
        }
      );
    }

    if (message.user.energy < 2) {
      return bot(
        `вы нанесли боссу ${utils.sp(
          Math.floor(Math.round(message.user.sataka * mn))
        )} урона! 👊🗡️
❤ Жизни босса: ${utils.sp(bossinfo.boss)} из ${utils.sp(bossinfo.boss_max)} 💚
⚡ Ваша энергия кончилась! ⛔`,

        {
          keyboard: JSON.stringify({
            inline: true,

            buttons: [
              [
                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "⚔ Атака",
                  },

                  color: "negative",
                },

                {
                  action: {
                    type: "text",

                    payload: "{}",

                    label: "😈 Босс топ",
                  },

                  color: "secondary",
                },
              ],
            ],
          }),
        }
      );
    }
  }
});

cmd.hear(/^(?:босс сила|👊 Босс сила)$/i, async (message, bot) => {

  if(Number(Number(message.user.sataka) + Number(message.args[1])) > 1500) return bot( `превышен лимит прокачки силы.💯 - ${Number(Number(message.user.sataka) + Number(message.args[1]))}`);



  if (!message.isChat || message.chat.type === 1) {
    if (message.user.settings.adm >= 2)
      return bot(
        `Любимой администрации запрещено повышать силу в целях защиты нашего босса 💚`
      );

    if (message.user.sataka >= 5000)
      return bot(`Ваша сила уже максимально прокачана! 💪🔝`);
    if (message.user.balance < 50000000 * message.user.sataka)
      return bot(
        `у Вас не хватает денег! ❌💵\n\n💰 Ваш баланс: ${utils.sp(
          message.user.balance
        )} ${val1} 💚`
      );

    message.user.balance -= 50000000 * message.user.sataka;
    message.user.sataka += 1;

    if (message.user.sataka >= 700 && message.user.questbosspower === false) {
      await bot(
        `Ваша сила больше 700, вы получаете бонус за свою силу в виде  2.OOO.OOO.OOO ${val1}`
      );

      message.user.balance += 2000000000;

      message.user.questbosspower = true;
    }

    return bot(
      `сила Вашей атаки была повышена за ${utils.sp(
        50000000 * (message.user.sataka - 1)
      )} ${val1} 💵👊
💰 Баланс: ${utils.sp(message.user.balance)}$`,

      {
        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "👊 Босс сила",
                },

                color: "positive",
              },
            ],
          ],
        }),
      }
    );
  }
});

cmd.hear(/^(?:босс топ|😈 Босс топ)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {
    let top = [];

    double
      .filter((x) => x.settings.adm === 0)
      .map((x) => {
        top.push({ bossyr: x.bossyr, tag: x.tag, id: x.id, mention: x.mention });
      });

    top.sort((a, b) => {
      return b.bossyr - a.bossyr;
    });

    let text = ``;

    const find = () => {
      let pos = 100;

      for (let i = 0; i < top.length; i++) {
        if (top[i].id === message.senderId) return (pos = i);
      }

      return pos;
    };

    for (let i = 0; i < 10; i++) {
      if (!top[i])
        return message.send(
          "👥 В боте должно зарегистрировано не менее 10 игроков!"
        );

      const user = top[i];

      text += `\n${i === 9 ? `&#128287;` : `${i + 1}&#8419;`} ${user.mention ? `@id${user.id} (${user.tag})` : `${user.tag}`
        } — нанёс ${utils.sp(user.bossyr)} урона.`;
    }

    return bot(
      `топ по общему урону:${text}
➖➖➖➖➖➖➖➖
➡${utils.gi(find() + 1)} ${message.user.tag} — нанёс ${utils.sp(
        message.user.bossyr
      )} урона.`,

      {
        keyboard: JSON.stringify({
          inline: true,

          buttons: [
            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "🔅 Топ реферал",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "😈 Босс топ",
                },

                color: "default",
              },

              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "🏆 Топ рейтинг",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "👥 Топ игроков",
                },

                color: "default",
              },

              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "🌐 Топ биткоины",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "〽️ Топ опыт",
                },

                color: "default",
              },

              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "🏎️ Топ гонщиков",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "💰 Топ баланс",
                },

                color: "default",
              },
            ],

            [
              {
                action: {
                  type: "text",

                  payload: "{}",

                  label: "💌 Топ сообщения",
                },

                color: "default",
              },
            ],
          ],
        }),
      }
    );
  }
});

// Команды основателя









module.exports = commands;
