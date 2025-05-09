let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json') 

let chats = require('../database/chats.json')


const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './database/tokens.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}


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


const tokenData = getToken();

const chatlogi = tokenData.chatlogi;  
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


const labels = [
  { label: "💎", chance: 1, command: "алмазя" },
  { label: "🔑", chance: 5, command: "ключя" },
  { label: "❌", chance: 30, command: "крести" },
  { label: "🪨", chance: 20, command: "каменью" },
  { label: "⬛", chance: 30, command: "пусток" },
];

function getRandomLabel() {
  const totalChance = labels.reduce((sum, item) => sum + item.chance, 0);
  const random = Math.random() * totalChance;
  let cumulativeChance = 0;

  for (const item of labels) {
    cumulativeChance += item.chance;
    if (random <= cumulativeChance) {
      return item;
    }
  }

  return { label: "🪨", command: "каменью" };
}

cmd.hear(/^(?:⛏️ работать|работать)$/i, async (message, bot) => {

  return message.send(`Вы начали работу шахтёром: `, {
    keyboard: JSON.stringify({
      one_time: false,
      buttons: [
        [
          createButton(),
          createButton(),
          createButton(),
        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "🏠",
            },
            color: "positive",
          },
        ],
      ],
    }),
  });
});


function createButton() {
  const randomLabel = getRandomLabel();
  return {
    action: {
      type: "text",
      payload: JSON.stringify({ command: randomLabel.command }),
      label: randomLabel.label,
    },
    color: "secondary",
  };
}
// label: randomLabel.label,

cmd.hear(/^(?:каменью)$/i, async (message, bot) => {

  if (message.user.energy <= 0) return bot(`у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`)

  let reward = 0;
  
  if (message.user.levl == 1) {
    reward = 20000;
  } else if (message.user.levl == 2) {
    reward = 30000;
  } else if (message.user.levl == 3) {
    reward = 40000;
  } else if (message.user.levl == 4) {
    reward = 50000;
  } else if (message.user.levl == 5) {
    reward = 60000;
  } else if (message.user.levl == 6) {
    reward = 70000;
  } else if (message.user.levl == 7) {
    reward = 80000;
  } else if (message.user.levl == 8) {
    reward = 90000;
  } else if (message.user.levl == 9) {
    reward = 100000;
  } else if (message.user.levl == 10) {
    reward = 110000;
  } else {
    reward = 0;
  }

  message.user.kamen +=1
  message.user.balance += reward;
  message.user.energy -= 1

  let text = `🪨 Вы наткнулись на камень.`;

  text += `\n💲 Баланс: ${utils.sp(message.user.balance)} $
  👑 Энергия: ${utils.sp(message.user.energy)}/${utils.sp(message.user.maxenergy)}
  Заплатили - ${utils.sp(reward)} ${val1}`;

  return message.send(`${text}`, {
    keyboard: JSON.stringify({
      one_time: false,
      buttons: [
        [
          createButton(),
          createButton(),
          createButton(),

        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "🏠",
            },
            color: "positive",
          },
        ],
      ],
    }),
  });
})

cmd.hear(/^(?:ключя)$/i, async (message, bot) => {
  if (message.user.energy <= 0) return bot(`у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`)



  let reward = 0;

  if (message.user.levl == 1) {
    reward = 50000;
  } else if (message.user.levl == 2) {
    reward = 70000;
  } else if (message.user.levl == 3) {
    reward = 90000;
  } else if (message.user.levl == 4) {
    reward = 110000;
  } else if (message.user.levl == 5) {
    reward = 130000;
  } else if (message.user.levl == 6) {
    reward = 150000;
  } else if (message.user.levl == 7) {
    reward = 170000;
  } else if (message.user.levl == 8) {
    reward = 190000;
  } else if (message.user.levl == 9) {
    reward = 210000;
  } else if (message.user.levl == 10) {
    reward = 230000;
  } else {
    reward = 0;
  }


  message.user.zoloto +=1
  message.user.balance += reward;
  message.user.energy -= 1

  let text = `🔑 Вы наткнулись на золото.`;

  text += `\n💲 Баланс: ${utils.sp(message.user.balance)} $
  👑 Энергия: ${utils.sp(message.user.energy)}/${utils.sp(message.user.maxenergy)}
  Заплатили - ${utils.sp(reward)} ${val1}`;

  return message.send(`${text}`, {
    keyboard: JSON.stringify({
      one_time: false,
      buttons: [
        [
          createButton(),
          createButton(),
          createButton(),

        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "🏠",
            },
            color: "positive",
          },
        ],
      ],
    }),
  });
})

cmd.hear(/^(?:крести)$/i, async (message, bot) => {

  if (message.user.energy <= 0) return bot(`у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`)



  message.user.energy -= 1

  let text = `❌ Вы ничего не нашли.
  👑 Энергия: ${utils.sp(message.user.energy)}/${utils.sp(message.user.maxenergy)}`;


  return message.send(`${text}`, {
    keyboard: JSON.stringify({
      one_time: false,
      buttons: [
        [
          createButton(),
          createButton(),
          createButton(),
        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "🏠",
            },
            color: "positive",
          },
        ],
      ],
    }),
  });
})

cmd.hear(/^(?:пусток)$/i, async (message, bot) => {
  if (message.user.energy <= 0) return bot(`у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`)


  const randomValue = Math.floor(Math.random() * 100) + 1;
  let reward = 0;



  if (message.user.levl == 1) {
    reward = 10000;
  } else if (message.user.levl == 2) {
    reward = 15000;
  } else if (message.user.levl == 3) {
    reward = 20000;
  } else if (message.user.levl == 4) {
    reward = 25000;
  } else if (message.user.levl == 5) {
    reward = 30000;
  } else if (message.user.levl == 6) {
    reward = 35000;
  } else if (message.user.levl == 7) {
    reward = 40000;
  } else if (message.user.levl == 8) {
    reward = 45000;
  } else if (message.user.levl == 9) {
    reward = 50000;
  } else if (message.user.levl == 10) {
    reward = 60000;
  } else {
    reward = 0;
  }

  message.user.ygol +=1
  message.user.balance += reward;
  message.user.energy -= 1

  let text = `⬛ Вы наткнулись на уголь.`;

  text += `\n💲 Баланс: ${utils.sp(message.user.balance)} $
  👑 Энергия: ${utils.sp(message.user.energy)}/${utils.sp(message.user.maxenergy)}
  Заплатили - ${utils.sp(reward)} ${val1}`;

  return message.send(`${text}`, {
    keyboard: JSON.stringify({
      one_time: false,
      buttons: [
        [
          createButton(),
          createButton(),
          createButton(),

        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "🏠",
            },
            color: "positive",
          },
        ],
      ],
    }),
  });
})

cmd.hear(/^(?:алмазя)$/i, async (message, bot) => {
  if (message.user.energy <= 0) return bot(`у Вас закончилась энергия! 🔋🤒\n\n💤 Энергия восстанавливается каждые 5 минут.`)


  const randomValue = Math.floor(Math.random() * 100) + 1;
  let reward = 0;


  if (message.user.levl == 1) {
    reward = 200000;
  } else if (message.user.levl == 2) {
    reward = 240000;
  } else if (message.user.levl == 3) {
    reward = 280000;
  } else if (message.user.levl == 4) {
    reward = 320000;
  } else if (message.user.levl == 5) {
    reward = 360000;
  } else if (message.user.levl == 6) {
    reward = 400000;
  } else if (message.user.levl == 7) {
    reward = 440000;
  } else if (message.user.levl == 8) {
    reward = 480000;
  } else if (message.user.levl == 9) {
    reward = 520000;
  } else if (message.user.levl == 10) {
    reward = 560000;
  } else {
    reward = 0;
  }

  message.user.diamond +=1
  message.user.balance += reward;
  message.user.energy -= 1

  let text = `💎 Вы наткнулись на алмаз.`;

  text += `\n💲 Баланс: ${utils.sp(message.user.balance)} $
  👑 Энергия: ${utils.sp(message.user.energy)}/${utils.sp(message.user.maxenergy)}
  Заплатили - ${utils.sp(reward)} ${val1}`;

  return message.send(`${text}`, {
    keyboard: JSON.stringify({
      one_time: false,
      buttons: [
        [
          createButton(),
          createButton(),
          createButton(),

        ],
        [
          {
            action: {
              type: "text",
              payload: '{"button": "1"}',
              label: "🏠",
            },
            color: "positive",
          },
        ],
      ],
    }),
  });
})


module.exports = commands;
