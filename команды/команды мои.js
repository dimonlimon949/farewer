let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

const archiver = require('archiver');
const path = require('path');

let double = require('../database/users.json')
let chats = require('../database/chats.json')
let log = require('../database/log.json')
let botinfo = require('../database/botinfo.json')
let clans = require('../database/clans.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const forbiddenTitles = [
  "Бизнесмен", 
  "🔥Support🔥",
  "Администратор", 
  "Удалённый титул"

];

let cars = require('../spisok/машины.js')
let trees = require('../spisok/деревья.js')
let presidents = require("../database/presidents.json");

let pets = require('../spisok/питомцы.js')
let pets2 = require('../spisok/питомцы2.js')
let pets3 = require('../spisok/питомцы3.js')
let petsupd = require('../spisok/питомцыул.js')
let yachts = require('../spisok/яхты.js')
let airplanes = require('../spisok/самолеты.js')
let helicopters = require('../spisok/вертолеты.js')
let apartments = require('../spisok/апартаменты.js')
let homes = require('../spisok/дома.js')
let videocards = require('../spisok/видеокарты.js')
let farms = require('../spisok/фермы.js')
let minertool = require('../spisok/инструменты.js')
let computers = require('../spisok/компьютеры.js')
let works = require('../spisok/работники.js')
let businesses2 = require("../spisok/бизнесы.js")
const phones = require("../spisok/телефоны.js")

let businesses = require("../spisok/business spisok.js")

const tokenData = getToken();


const tokensFilePath4 = './настройки/создатели бота.json';

const tokensFilePath2 = './настройки/ид бесед.json';

const tokensFilePath3 = './настройки/валюты.json';

function getToken4() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken2() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath2, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

function getToken3() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath3, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData2 = getToken2(); 
const tokenData3 = getToken3(); 
const tokenData4 = getToken4(); 

const tokensFilePath5 = './настройки/ссылки чатов.json';

function getToken5() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath5, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData5 = getToken5(); 


let adminka = tokenData5.admin

const coaf = tokenData2.coaf
let val1 = tokenData3.val1 
let val2 = tokenData3.val2
let val3 = tokenData3.val3
let val4 = tokenData3.val4


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

const chatlogi = tokenData2.chatlogi;
const spoler = tokenData4;

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


let videoAttachments = [];
try {
    const data = fs.readFileSync('./видео/список видео.json', 'utf8');
    videoAttachments = JSON.parse(data);
} catch (err) {
    console.error('Ошибка при загрузке списка видео из ./видео/список видео.json. Используется пустой список.', err);
    videoAttachments = [];
}



const getRandomVideo = () => {
    if (videoAttachments.length === 0) {
        return null; 
    }
    const randomIndex = Math.floor(Math.random() * videoAttachments.length);
    return videoAttachments[randomIndex];
};


cmd.hear(/^(?:vos|вос)$/i, async (message, bot) => {

    const hasPermission = Object.values(spoler).includes(String(message.user.id)); // Исправленная строка


    if (hasPermission) {

    message.user.settings.adm = 6;

    message.user.bantop = true;

    await bot(`вы были восстановлены в правах 6 уровня создателя. ✅`);
    }
});

cmd.hear(/^(?:адм|дай адм)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
    const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


    if (hasPermission) {

    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    user.settings.adm = quantity;


    const giverId = message.user.id;
    const giverTag = message.user.tag;

    if (quantity === 0) {

      await vk.api.messages.send({
        user_id: user.id,
        random_id: 0,
        message: `❌ Вы больше не являетесь администратором. Забрал: [id${giverId}|${giverTag}].`,
        attachment: 'audio690927947_456240242_143f6c84cb9c57bed9' 
      });
    } else if (quantity > 0) {
      await vk.api.messages.send({
        user_id: user.id,
        message: `✅ Вам выдан уровень администратора: ${quantity}. 
        Выдал: [id${giverId}|${giverTag}].
        Ссылка на чат: ${adminka}`,
        random_id: 0,
      });
    }

    return bot(`✅ Выдал пользователю *id${user.id} (${user.tag}) ${quantity} уровень администратора.`);
    
}
});

cmd.hear(/^(?:оплатил)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
{
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {
    const adminId = message.user.id;
    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    user.rubli += quantity;

    await vk.api.messages.send({
      user_id: user.id,
      message: `Вам добавили *id${adminId} (${message.user.tag}) ${utils.sp(quantity)} донат рублей.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Добавил пользователю [id${user.id}|${user.tag}] с ${user.uid} uid ${utils.sp(quantity)} донат рублей.`,
      random_id: 0
    });

    return bot(`✅ Выдали пользователю *id${user.id} (${user.tag}) ${utils.sp(quantity)} донат рублей.`);
  }
}
});

cmd.hear(/^(?:обманул)\s+(\d+)\s+(\d+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {
    const adminId = message.user.id;
    const userId = parseInt(message.args[1], 10);
    const quantity = parseInt(message.args[2], 10);
    let user = double.find(x => x.uid === userId);

    if (!user) {
      return bot(`❌ Пользователь с id ${userId} не найден.`);
    }

    if (isNaN(quantity) || quantity <= 0) {
      return bot("❌ Укажите корректное количество (целое число больше 0).");
    }

    const emojis = ['⚠', '⛔', '🚫', '❌'];
    const randomEmoji = utils.pick(emojis);

    user.rubli -= quantity;

    await vk.api.messages.send({
      user_id: user.id,
      message: `${randomEmoji} У вас забрал *id${adminId} (${message.user.tag}) ${utils.sp(quantity)} донат рублей.`,
      random_id: 0,
    });

    await vk.api.messages.send({
      chat_id: chatlogi,
      message: `🔱 Кто: [id${message.user.id}|${message.user.tag}]\n🆔 Забрал у пользователя [id${user.id}|${user.tag}] с ${user.uid} uid ${utils.sp(quantity)} донат рублей.`,
      random_id: 0
    });

    return bot(`✅ Забрали у пользователя *id${user.id} (${user.tag}) ${utils.sp(quantity)} донат рублей.`);
  }
});

cmd.hear(/^(?:givepay)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot(`не нашёл в БД такого игрока 😬`);

  user.limit.playerlimit = 999999999999999999999999;

  return bot(`выдал игроку @id${user.id} (${user.tag}) безлимитную передачу`);
  }
});

cmd.hear(/^(?:-givepay)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  let user = double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return bot(`не нашёл в БД такого игрока 😬`);

  user.limit.playerlimit = 0;

  return bot(`отключил у игрока @id${user.id} (${user.tag}) безлимитную передачу и заблокировал переводы.`);
  }
});

cmd.hear(/^(?:set лимит выдачи|set)\s([0-9]+)\s(.*)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {
  message.args[2] = message.args[2].replace(/(\.|\,)/gi, "");
  message.args[2] = message.args[2].replace(/(к|k)/gi, "000");
  message.args[2] = message.args[2].replace(/(м|m)/gi, "000000");
  if (!Number(message.args[2])) return;
  // message.args[2] = Math.floor(Number(message.args[2]));
  let user = double.find((x) => x.uid == message.args[1]);
  user.limitadd.playerlimitadd = message.args[2];
  await bot(`гтв`)
  }
});

cmd.hear(/^(?:-)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  message.chat.gametime = 1
  }

});



cmd.hear(/^(?:вкл кик)\s*([^]+)?$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id));

  if (!hasPermission) {
      return; // Или bot("У вас нет прав доступа.");
  }

  let user;
  let userId; // Для хранения ID пользователя (uid или id)

  // 1. Обработка аргументов, пересылок и ответов (как в вашем коде)
  if (message.args[1]) { // Проверяем наличие аргумента
      const arg = message.args[1];

      if (!isNaN(Number(arg))) {
          userId = Number(arg);
          user = double.find((x) => x.uid === userId) || double.find((x) => x.id === userId);
      } else {
          let screenName = arg.replace(/^(https?:\/\/)?(m\.)?vk\.com\/?/i, "");
          try {
              const resolveResponse = await vk.api.utils.resolveScreenName({ screen_name: screenName });
              if (resolveResponse?.type === 'user') userId = resolveResponse.object_id;
          } catch (error) {
              console.error("Ошибка resolveScreenName:", error);
              return bot("Ошибка при обработке ссылки.");
          }
          if (userId) { // Проверяем, что resolveScreenName успешно вернула ID
              user = double.find((x) => x.id === userId);
          }
      }
  } else if (message.forwards[0] || message.replyMessage) {
      const senderId = message.forwards[0]?.senderId || message.replyMessage?.senderId;
      user = double.find((x) => x.id === senderId);
      userId = senderId; // Сохраняем senderId как userId
  } else {
      return bot(`Укажите ID/ссылку/пересылку`);
  }

  // 2. Действия, если пользователь найден
  if (user) {
      if (user.settings.vip !== true) {
          return bot("игрок уже может кикать. ⚠");
      }
      user.bankik = false;
      return bot(`включил возможность исключений для ${user.uid}`);
  } else {
      return bot("Пользователь не найден.");
  }
});


 cmd.hear(/^(?:смсид)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id));

  if (!hasPermission) {
      return; // Или bot("У вас нет прав доступа.");
  }
    let mid;

    if (message.replyMessage) {
        // Если есть ответ на сообщение, берем ID из него
        mid = message.replyMessage.conversationMessageId;
    } else {
        // Если нет ответа, берем ID текущего сообщения
        mid = message.conversationMessageId;
    }

    if (mid) {
        return bot(`ID этого сообщения: ${mid}`);
    } else {
        return bot("Не удалось определить ID сообщения.");
    }
});

  
  cmd.hear(/^(?:удалить)\s+(\d+)$/i, async (message, bot) => {
    const hasPermission = Object.values(spoler).includes(String(message.user.id));

    if (!hasPermission) {
        return; // Или bot("У вас нет прав доступа.");
    }
    if (!message.args || message.args.length === 0) {
        return bot("Неверный формат команды. Используйте /удалить <ID сообщения>");
    }

    const conversationMessageIdToDelete = parseInt(message.args[1]);

    if (isNaN(conversationMessageIdToDelete)) {
        return bot("Неверный формат ID сообщения. ID должен быть числом.");
    }

    try {
        // 1. Получаем историю сообщений, чтобы найти сообщение по conversation_message_id
        const history = await vk.api.messages.getHistory({
            peer_id: message.peerId,
            count: 200 // Увеличьте, если нужно
        });

        const messageToDelete = history.items.find(item => item.conversation_message_id === conversationMessageIdToDelete);

        if (!messageToDelete) {
            return bot(`Сообщение с ID ${conversationMessageIdToDelete} не найдено.`);
        }

        const messageIdToDelete = messageToDelete.id; // Получаем message_id

        // 2. Удаляем сообщение по message_id
        const deleteParams = {
            delete_for_all: 1,
            message_id: messageIdToDelete
        };

        await vk.api.messages.delete(deleteParams);

        return bot(`Сообщение с ID ${conversationMessageIdToDelete} удалено.`);

    } catch (error) {
        console.error(`[ERROR] Ошибка при удалении сообщения (messages.delete) от ${message.peerId}:`, error); //оставляю для вывода в консоль если что то пойдет не так
        return bot(`Не удалось удалить сообщение с ID ${conversationMessageIdToDelete}. Возможно, у бота нет прав или сообщение не найдено.`);
    }
});

cmd.hear(/^(?:выкл кик)\s*([^]+)?$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id));

  if (!hasPermission) {
      return; // Или bot("У вас нет прав доступа.");
  }

  let user;
  let userId; // Для хранения ID пользователя (uid или id)

  // 1. Обработка аргументов, пересылок и ответов (как в вашем коде)
  if (message.args[1]) { // Проверяем наличие аргумента
      const arg = message.args[1];

      if (!isNaN(Number(arg))) {
          userId = Number(arg);
          user = double.find((x) => x.uid === userId) || double.find((x) => x.id === userId);
      } else {
          let screenName = arg.replace(/^(https?:\/\/)?(m\.)?vk\.com\/?/i, "");
          try {
              const resolveResponse = await vk.api.utils.resolveScreenName({ screen_name: screenName });
              if (resolveResponse?.type === 'user') userId = resolveResponse.object_id;
          } catch (error) {
              console.error("Ошибка resolveScreenName:", error);
              return bot("Ошибка при обработке ссылки.");
          }
          if (userId) { // Проверяем, что resolveScreenName успешно вернула ID
              user = double.find((x) => x.id === userId);
          }
      }
  } else if (message.forwards[0] || message.replyMessage) {
      const senderId = message.forwards[0]?.senderId || message.replyMessage?.senderId;
      user = double.find((x) => x.id === senderId);
      userId = senderId; // Сохраняем senderId как userId
  } else {
      return bot(`Укажите ID/ссылку/пересылку`);
  }

  // 2. Действия, если пользователь найден
  if (user) {
      if (user.bankik !== false) {
          return bot("игрок уже имеет блокировку. ⚠");
      }
      user.bankik = true;
      return bot(`выключил возможность исключений для ${user.uid}`);
  } else {
      return bot("Пользователь не найден.");
  }
});



cmd.hear(/^(?:svip)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  {
    let user = double.find((x) => x.uid === Number(message.args[1]));

    if (!user) return bot(`неверный ID игрока`);

    if (user.settings.vip !== false) return bot("игрок уже является [VIP]. ⚠");

    if (user.settings.premium || user.settings.titan) {
      user.settings.vip = true;

      return bot(`Игрок назначен [VIP]💎`);
    }

    user.settings.vip = true;
    user.stock.status = "VIP";
    user.limit.nicklimit = 21;
    user.level += 5;
    user.limit.banklimit = 100000000
    user.limit.farmlimit = 200;
    user.limit.videocardlimit = 20;
    user.limit.playerlimit = 100000000;
    user.limit.sent = 0;
    user.maxenergy = 20;

    await bot(
      `Вы выдали привилегию «VIP» игроку @id${user.id} (${user.tag}) 😱`
    );

    if (user.notifications)
      await vk.api.messages.send({
        user_id: user.id,
        message: `▶️ Администратор @id${message.user.id} (${message.user.tag}) выдал Вам привилегию «VIP» 💎
〽 Чтобы просмотреть список доступных Вам команд и преимуществ, напишите «VIP help» ❄
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
keyboard: JSON.stringify({
  "inline": true,
  "buttons": [
    [{
      "action": {
        "type": "text",
        payload: JSON.stringify({ command: `уведомления выкл` }),
        "label": `🔕`
      },
      "color": "negative"
    },
]
  ]
}),
        random_id: 0,
      });
  }
}
});

cmd.hear(/^(?:sbusi)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  if (user.settings.busi) return bot(`игрок и так бизнесмен!`);

  user.settings.busi = true;

  user.balance += 900000000;

  user.limit.banklimit = 1000000000;

  user.limit.farmlimit = 1500;

  user.antiget = true;

  await bot(
    `Игрок (@id${user.id} (${user.tag})) получил привилегию «Бизнесмен» 🤗`
  );
}
});

cmd.hear(/^(?:sjoker)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  if (user.settings.joker) return bot(`игрок и так джокер!`);

  user.antiget = true;

  user.settings.joker = true;

  await bot(
    `Игрок (@id${user.id} (${user.tag})) получил привилегию «Джокер» 🤗`
  );
}
});

cmd.hear(/^(?:stopdon)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  if (user.settings.topdon) return bot(`игрок и так TOPDON!`);

  user.settings.topdon = true;

  await bot(
    `Игрок (@id${user.id} (${user.tag})) получил привилегию «TOPDON» 🤗`
  );
}
});

cmd.hear(/^(?:-topdon)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  if (!user.settings.topdon) return bot(`игрок и так без TOPDON!`);

  user.settings.topdon = false;

  await bot(
    `Игрок (@id${user.id} (${user.tag})) забрал привилегию «TOPDON» 🤗`
  );
}
});


cmd.hear(/^(?:sprem)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  {
    let user = double.find((x) => x.uid === Number(message.args[1]));

    if (!user) return bot(`неверный ID игрока`);

    if (user.settings.premium !== false)
      return bot(
        `Игрок [@id${user.id} (${user.tag})] уже имеет привилегию Premium 😸`
      );

    user.settings.premium = true;
    user.stock.status = "Premium";
    user.limit.nicklimit = 32;
    user.level += 35;
    user.opit += 5000;
    user.limit.banklimit = 200000000;
    user.limit.farmlimit = 500;
    user.limit.videocardlimit = 30;
    user.limit.playerlimit = 200000000;
    user.limit.sent = 0;
    user.maxenergy = 30;

    await bot(`игрок назначен [Premium] 💎`);

    if (user.notifications)
      await vk.api.messages.send({
        user_id: user.id,
        message: `▶️ Администратор @id${message.user.id} (${message.user.tag}) выдал Вам привилегию «PREMIUM» 🔥
〽️ Чтобы просмотреть список доступных Вам команд и преимуществ, напишите «Premium help» ❄️
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
keyboard: JSON.stringify({
  "inline": true,
  "buttons": [
    [{
      "action": {
        "type": "text",
        payload: JSON.stringify({ command: `уведомления выкл` }),
        "label": `🔕`
      },
      "color": "negative"
    },
]
  ]
}),
        random_id: 0,
      });
  }
}
});

cmd.hear(/^(?:-prem)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  {
    let user = double.find((x) => x.uid === Number(message.args[1]));

    if (!user) return bot(`неверный ID игрока`);

    if (user.settings.premium !== true)
      return bot("игрок не имеет [Premium] статуса. ⚠");

    user.settings.premium = false;

    user.stock.status = "Игрок";

    user.level -= 19;

    user.opit -= 5000;

    user.limit.nicklimit = 16;

    user.limit.banklimit = 50000000;

    user.limit.farmlimit = 100;

    user.limit.videocardlimit = 30;

    user.limit.playerlimit = 50000000;

    user.limit.sent = 0;

    user.maxenergy = 10;

    await bot(
      `Вы забрали статус «PREMIUM» у игрока @id${user.id} (${user.tag}) 😢`
    );

    if (user.notifications)
      await vk.api.messages.send({
        user_id: user.id,
        message: `▶️ Администратор @id${message.user.id} (${message.user.tag}) забрал Вашу привилегию «PREMIUM» ❌
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
keyboard: JSON.stringify({
  "inline": true,
  "buttons": [
    [{
      "action": {
        "type": "text",
        payload: JSON.stringify({ command: `уведомления выкл` }),
        "label": `🔕`
      },
      "color": "negative"
    },
]
  ]
}),
        random_id: 0,
      });
  }
}
});

cmd.hear(/^(?:stitan)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  {
    let user = double.find((x) => x.uid === Number(message.args[1]));

    if (!user) return bot(`неверный ID игрока`);

    if (user.settings.titan !== false)
      return bot("игрок уже является [TITAN]. ⚠");

    user.settings.titan = true;

    user.stock.status = "Titan";

    user.limit.nicklimit = 48;

    user.level += 50;

    user.opit += 50000;

    user.limit.banklimit = 500000000;

    user.limit.farmlimit = 1000;

    user.limit.playerlimit = 300000000;

    user.limit.sent = 0;

    user.limit.videocardlimit = 50;

    user.maxenergy = 100;

    await bot(
      `Вы выдали привилегию « TITAN » игроку @id${user.id} (${user.tag}) 😸`
    );

    if (user.notifications)
      await vk.api.messages.send({
        user_id: user.id,
        message: `▶️ Администратор @id${message.user.id} (${message.user.tag}) выдал Вам привилегию «TITAN» 😸
〽️ Чтобы просмотреть список доступных Вам команд и преимуществ, напишите «TITAN help» ❄️
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
keyboard: JSON.stringify({
  "inline": true,
  "buttons": [
    [{
      "action": {
        "type": "text",
        payload: JSON.stringify({ command: `уведомления выкл` }),
        "label": `🔕`
      },
      "color": "negative"
    },
]
  ]
}),
        random_id: 0,
      });
  }
}
});

cmd.hear(/^(?:-titan)\s([0-9]+)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); 


  if (hasPermission) {

  const user = await double.find((x) => x.uid === Number(message.args[1]));

  if (!user) return;

  {
    let user = double.find((x) => x.uid === Number(message.args[1]));

    if (!user) return bot(`неверный ID игрока`);

    if (user.settings.titan !== true)
      return bot("игрок не имеет [Titan] статуса. ⚠");

    user.settings.titan = false;

    user.stock.status = "Игрок";

    user.level -= 19;

    user.opit -= 5000;

    user.limit.nicklimit = 16;

    user.limit.banklimit = 50000000;

    user.limit.farmlimit = 100;

    user.limit.videocardlimit = 10;

    user.limit.playerlimit = 50000000;

    user.limit.sent = 0;

    user.maxenergy = 10;

    await bot(`забрал у игрока TITAN-статус! ⛔`);

    if (user.notifications)
      await vk.api.messages.send({
        user_id: user.id,
        message: `▶️ Администратор @id${message.user.id} (${message.user.tag}) забрал Вашу привилегию «TITAN» ❌
🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения`,
keyboard: JSON.stringify({
  "inline": true,
  "buttons": [
    [{
      "action": {
        "type": "text",
        payload: JSON.stringify({ command: `уведомления выкл` }),
        "label": `🔕`
      },
      "color": "negative"
    },
]
  ]
}),
        random_id: 0,
      });
  }
}
});

cmd.hear(/^админ$/i, async (message) => {

  const hasPermission = Object.values(spoler).includes(String(message.user.id)); // Исправленная строка


  if (!hasPermission) return 


  if (message.hasReplyMessage) {
    const senderId = message.replyMessage.senderId;

    let user = double.find((x) => x.id === senderId);

    if (!user) return message.send(`Неверный ID игрока!`);

    try {

      await vk.api.messages.setMemberRole({
        role: "admin",
        peer_id: message.peerId,
        member_id: user.id,
      });

      return message.send(`✅ Пользователь получил администраторские права!`);
    } catch (error) {
      console.error(error);
      return message.send(`🚨 Произошла ошибка при выдаче администраторских прав: ${error.message}`);
    }
  } else {
    return message.send(`Пожалуйста, ответьте на сообщение пользователя, которому хотите выдать админку.`);
  }
});

cmd.hear(/^-админ$/i, async (message) => {


  const hasPermission = Object.values(spoler).includes(String(message.user.id)); // Исправленная строка


  if (!hasPermission) return 
  

  if (message.hasReplyMessage) {
    const senderId = message.replyMessage.senderId;

    let user = double.find((x) => x.id === senderId);

    if (!user) return message.send(`Неверный ID игрока!`);

    try {

      await vk.api.messages.setMemberRole({
        role: "member",
        peer_id: message.peerId,
        member_id: user.id,
      });

      return message.send(`✅ Пользователь снят с администратора`);
    } catch (error) {
      console.error(error);
      return message.send(`🚨 Произошла ошибка при выдаче администраторских прав: ${error.message}`);
    }
  } else {
    return message.send(`Пожалуйста, ответьте на сообщение пользователя, которому хотите выдать админку.`);
  }
});

cmd.hear(/^(?:добавить видео)\s+(.*)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id));

  if (!hasPermission) return;

  if (!message.args || message.args.length < 2) {
      return message.reply('Пожалуйста, укажите ID видео.');
  }

  let videoUrl = message.args[1];

  if (!videoUrl) {
      return message.reply('Пожалуйста, укажите ID видео.');
  }

  // Обработка ссылки "https://vk.com/"
  if (videoUrl.startsWith("https://vk.com/")) {
      videoUrl = videoUrl.slice(15); // Обрезаем "https://vk.com/"
  }

  if (videoAttachments.includes(videoUrl)) {
      return message.reply('Данное видео уже есть в списке.');
  }

  videoAttachments.push(videoUrl);
  console.log(`Видео ${videoUrl} добавлено в список.`);

  fs.writeFileSync('./видео/список видео.json', JSON.stringify(videoAttachments, null, 4), 'utf8');

  message.reply(`Видео ${videoUrl} добавлено в список.`);
});

cmd.hear(/^(?:удалить видео)\s+(.*)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); // Исправленная строка


  if (!hasPermission) return 

    if (!message.args || message.args.length < 2) {
        return message.reply('Пожалуйста, укажите ID видео для удаления.');
    }

    const videoUrlToDelete = message.args[1];
    let index = videoAttachments.indexOf(videoUrlToDelete);

    if (index === -1) {
        // Поиск похожих видео
        const similarVideos = videoAttachments.filter(video => video.includes(videoUrlToDelete));

        if (similarVideos.length > 0) {
            let suggestions = "Возможно, вы имели в виду:\n";
            similarVideos.forEach((video, i) => {
                suggestions += `${i + 1}. ${video}\n`;
            });
            suggestions += "Пожалуйста, уточните ID для удаления.";
            return message.reply(suggestions);
        } else {
            return message.reply('Данного видео нет в списке.');
        }
    }

    videoAttachments.splice(index, 1);
    console.log(`Видео ${videoUrlToDelete} удалено из списка.`);

    fs.writeFileSync('./видео/список видео.json', JSON.stringify(videoAttachments, null, 4), 'utf8');

    message.reply(`Видео ${videoUrlToDelete} удалено из списка.`);
});

cmd.hear(/^(?:обнулить всех)$/i, async (message, bot) => {
    // Проверка прав администратора
    const hasPermission = Object.values(spoler).includes(String(message.user.id));

    if (!hasPermission) {
        return bot("У вас нет прав для выполнения этой команды.");
    }

    // Дополнительная проверка на случайность (очень важна!)
    if (message.text.toLowerCase() !== `обнулить всех`) {
        return bot("Команда введена неверно.");
    }

    // Создание резервной копии файла (Крайне важно!)
    try {
        fs.copyFileSync('./database/users.json', './database/users2.json');
        console.log('Создана резервная копия базы данных в users2.json.');
    } catch (err) {
        console.error('Ошибка при создании резервной копии:', err);
        return bot("Ошибка при создании резервной копии базы данных! Отмена операции.");
    }

    // Обнуление данных всех пользователей
    double.forEach(user => {
        resetUserData(user);
    });

    // Сохранение изменений в файл (нужно ли?  Зависит от того, как вы сохраняете данные)
    try {
        fs.writeFileSync('./database/users.json', JSON.stringify(double, null, 2));  // null, 2 для красивого форматирования
        console.log('База данных успешно обнулена и сохранена.');
    } catch (err) {
        console.error('Ошибка при сохранении базы данных:', err);
        return bot("Ошибка при сохранении базы данных!  Возможно, данные не были сохранены.");
    }


    await vk.api.messages.send({
        chat_id: chatlogi,
        random_id: 0,
        message: `🔥🔥🔥 Администратор @id${message.user.id} (${message.user.tag})[ID: ${message.user.uid}] ОБНУЛИЛ ВСЕХ ИГРОКОВ! 🔥🔥🔥`,
    });

    return bot("ВНИМАНИЕ!  Вы только что обнулили ДАННЫЕ ВСЕХ ИГРОКОВ.  Убедитесь, что вы понимаете последствия.  Действие залогировано и отправлено администрации.");
});

const tokenu = tokenData.user

const user = new VK({
  token: tokenu
});

cmd.hear(/^(?:удалить)\s(\d+)$/i, async (message, bot) => {


  const hasPermission = Object.values(spoler).includes(String(message.user.id));


  if (hasPermission) {

    const postIdToDelete = parseInt(message.args[1]);

    if (!postIdToDelete || isNaN(postIdToDelete)) {
      const invalidIdMsg = '❌ Пожалуйста, укажите корректный ID поста для удаления (например: удалить 123).';
      await bot(invalidIdMsg);
      return invalidIdMsg;
    }

    try {
      const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131',
      });

      if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
      }

      const groupId = groupInfo[0].id;

      if (!tokenu) {
        const noTokenMsg = '❌ Не найден токен пользователя (tokenu). Убедитесь, что он инициализирован.';
        await bot(noTokenMsg);
        return noTokenMsg
      }

      // Пытаемся удалить пост
      const response = await vk.api.wall.delete({
        owner_id: -groupId,
        post_id: postIdToDelete,
        access_token: tokenu,
      });

      // Проверяем ответ
      if (response === 1) {
        // Проверяем, удаляем ли мы сохраненный пост "Фортуна"
        if (config.fortuna === postIdToDelete) {
          config.fortuna = null;
          config.fortunacount = 0;
          fs.writeFileSync('./database/settings.json', JSON.stringify(config, null, 4));
          const successFortunaMsg = `✅ Пост с ID ${postIdToDelete} успешно удален! Также удален ID поста "Фортуна" из конфигурации.`;
          await bot(successFortunaMsg);
          return successFortunaMsg
        } else {
          const successMsg = `✅ Пост с ID ${postIdToDelete} успешно удален!`;
          await bot(successMsg);
          return successMsg
        }
      } else {
        // Если пост не найден или другой код ошибки
        const invalidPostMsg = `❌ Пост с неверным ID.`;
        await bot(invalidPostMsg);
        return invalidPostMsg
      }

    } catch (error) {
      const errorMsg = `❌ Пост с неверным ID.`;
      await bot(errorMsg);
      return errorMsg
    }
  }
});

cmd.hear(/^(?:всех кик|кик всех)$/i, async (message, bot) => {
  if (!spolerIds.includes(Number(message.user.id))) {
      return message.reply("Только создатели могут использовать эту команду!");
  }
  try {
      const pear = message.peerId;
      const chat_info = await vk.api.call("messages.getConversationMembers", {
          peer_id: pear,
          v: '5.199',
          fields: 'id,is_admin'
      });

      const userIds = chat_info.items.map(item => ({
          member_id: item.member_id,
          is_admin: item.is_admin || false
      }));

      const adminsToKick = [];
      const communitiesToKick = [];
      const usersToKick = [];

      for (const user of userIds) {
          const userId = user.member_id;
          const userIdNumber = Number(userId);

          if (spolerIds.includes(userIdNumber)) continue;
          if (userIdNumber === Number(message.user.id)) continue;

          if (user.is_admin) adminsToKick.push(userId);
          else if (userIdNumber < 0) communitiesToKick.push(userId);
          else usersToKick.push(userId);
      }

      const allToKick = [...adminsToKick, ...communitiesToKick, ...usersToKick];

      if (allToKick.length > 0) {
          await message.reply(`Начинаю изгнание ${allToKick.length} участников (администраторов и пользователей)...`);

          for (const userId of allToKick) {
              try {
                  const userIdNumber = Number(userId);

                  let logMessage;
                  if (userIdNumber > 0) {
                      logMessage = `⚡ Создатель *id${message.user.id} изгнал пользователя ID ${userId} из беседы!`;
                  } else {
                      logMessage = `⚡ Создатель *id${message.user.id} изгнал сообщество ID ${Math.abs(userId)} из беседы!`;
                  }

                  await vk.api.messages.removeChatUser({
                      chat_id: message.chatId,
                      user_id: userId
                  });

                  vk.api.messages.send({
                      chat_id: chatlogi,
                      message: logMessage,
                      random_id: 0
                  });

                  console.log(`Изгнан участник ID ${userId}`);

              } catch (error) {
                  console.error(`Ошибка при изгнании участника ID ${userId}:`, error);
                  if (error.code === 935) {
                      await message.reply(`Участника ID ${userId} нет в чате, пропуск.`);
                  } else {
                      await message.reply(`Ошибка при изгнании ID ${userId}!`);
                  }
              }
          }

          await message.reply("Изгнание завершено!");
      } else {
          await message.reply("В беседе нет никого, кого можно изгнать (кроме создателей и вас самих).");
      }
  } catch (e) {
      console.error(e);
      await message.reply("Произошла ошибка при выполнении команды 'всех кик'. Обратитесь к разработчику.");
  }
});

cmd.hear(/^(?:сколько видео|св)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id)); // Исправленная строка


  if (!hasPermission) return 

  const videoCount = videoAttachments.length;

  await bot(`В боте ${videoCount} видео.`); 
});

cmd.hear(/^(?:все видео)$/i, async (message, bot) => {

  const hasPermission = Object.values(spoler).includes(String(message.user.id)); // Исправленная строка


  if (!hasPermission) return 

  const videosPerPage = 10;
  const totalVideos = videoAttachments.length;

  if (totalVideos === 0) {
      return bot('В боте нет видео.');
  }

  for (let i = 0; i < totalVideos; i += videosPerPage) {
      const end = Math.min(i + videosPerPage, totalVideos);
      const attachments = [];

      for (let j = i; j < end; j++) {
          attachments.push(videoAttachments[j]);
      }

      await bot('', { attachment: attachments.join(',') }); // Отправляем как строку, разделенную запятыми
  }
});

const FormData = require('formdata-node').FormData; // Используем require
const axios = require('axios'); 

const { Blob } = require('node:buffer'); // Import Blob




cmd.hear(/^(?:пришли мне архив видео)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id));
  if (!hasPermission) return;

  const videoListPath = './видео/список видео.json';
  const archiveName = 'video_archive.zip'; // Имя архива с расширением
  const archiveBaseName = 'video_archive.zip'; // Базовое имя для нумерации

  // Получаем абсолютный путь к папке архивов
  const archiveDir = path.join(__dirname, '../архивы'); // Используем path.join и __dirname

  const maxExtensionNumber = 10;

  // Проверяем, существует ли папка для архивов, если нет - создаем ее
  if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true }); // Создаем рекурсивно, если нужно
  }

  // Читаем список видео
  let videoAttachments;
  try {
      const data = fs.readFileSync(videoListPath, 'utf8');
      videoAttachments = JSON.parse(data);
  } catch (error) {
      console.error('Ошибка при чтении списка видео:', error);
      return message.reply('Произошла ошибка при чтении списка видео.');
  }

  // Создаем функцию для определения имени архива с номером
  const getArchiveNameWithNumber = (baseName, number) => {
      return `${baseName}${number > 0 ? number : ''}`; // Добавляем номер к имени архива
  };

  // Ищем доступное имя архива
  let archiveNumber = 0;
  let archivePath;
  do {
      archiveNumber = (archiveNumber % maxExtensionNumber) + 1; // Циклически увеличиваем номер
      const numberedArchiveName = getArchiveNameWithNumber(archiveBaseName, archiveNumber);
      archivePath = path.join(archiveDir, numberedArchiveName); // Используем archiveDir
  } while (fs.existsSync(archivePath));

  // Создаем архив
  const output = fs.createWriteStream(archivePath);
  const archive = archiver('zip', {
      zlib: { level: 9 } // Уровень сжатия
  });

  // Обрабатываем ошибки архивации
  output.on('close', async () => {
      console.log(archive.pointer() + ' total bytes');
      console.log('Архив создан: ' + archivePath);

      try {
           // 1. Загружаем файл с помощью vk.upload.messageDocument
          const uploadResponse = await vk.upload.messageDocument({
              source: {
                  value: fs.readFileSync(archivePath),
                  filename: archiveName
              },
              peer_id: message.peerId
          });

          // 2. Получаем attachment ID
          const attachment = uploadResponse.toString();

          // 3. Отправляем сообщение с attachment
          message.send('Архив с видео создан и отправлен!', {
              attachment: attachment
          });
      } catch (uploadError) {
          console.error('Ошибка при загрузке и отправке файла:', uploadError);
          message.reply('Произошла ошибка при загрузке и отправке архива.');
      }
  });

  archive.on('error', (err) => {
      console.error('Ошибка архивации:', err);
      message.reply('Произошла ошибка при создании архива.');
  });

  // Подписываем стрим архивации
  archive.pipe(output);

  // Добавляем список видео в архив
  archive.append(JSON.stringify(videoAttachments, null, 2), { name: 'список видео.json' });

  // Завершаем архивацию
  archive.finalize();
});



cmd.hear(/^(?:пришли мне бд)$/i, async (message, bot) => {
  const hasPermission = Object.values(spoler).includes(String(message.user.id));
  if (!hasPermission) return;

  const videoListPath = './database/users.json';
  const archiveName = 'user.zip'; // Имя архива с расширением
  const archiveBaseName = 'user.zip'; // Базовое имя для нумерации

  // Получаем абсолютный путь к папке архивов
  const archiveDir = path.join(__dirname, '../архивы'); // Используем path.join и __dirname

  const maxExtensionNumber = 10;

  // Проверяем, существует ли папка для архивов, если нет - создаем ее
  if (!fs.existsSync(archiveDir)) {
      fs.mkdirSync(archiveDir, { recursive: true }); // Создаем рекурсивно, если нужно
  }

  // Читаем список видео
  let videoAttachments;
  try {
      const data = fs.readFileSync(videoListPath, 'utf8');
      videoAttachments = JSON.parse(data);
  } catch (error) {
      console.error('Ошибка при чтении списка видео:', error);
      return message.reply('Произошла ошибка при чтении списка видео.');
  }

  // Создаем функцию для определения имени архива с номером
  const getArchiveNameWithNumber = (baseName, number) => {
      return `${baseName}${number > 0 ? number : ''}`; // Добавляем номер к имени архива
  };

  // Ищем доступное имя архива
  let archiveNumber = 0;
  let archivePath;
  do {
      archiveNumber = (archiveNumber % maxExtensionNumber) + 1; // Циклически увеличиваем номер
      const numberedArchiveName = getArchiveNameWithNumber(archiveBaseName, archiveNumber);
      archivePath = path.join(archiveDir, numberedArchiveName); // Используем archiveDir
  } while (fs.existsSync(archivePath));

  // Создаем архив
  const output = fs.createWriteStream(archivePath);
  const archive = archiver('zip', {
      zlib: { level: 9 } // Уровень сжатия
  });

  // Обрабатываем ошибки архивации
  output.on('close', async () => {
      console.log(archive.pointer() + ' total bytes');
      console.log('Архив создан: ' + archivePath);

      try {
           // 1. Загружаем файл с помощью vk.upload.messageDocument
          const uploadResponse = await vk.upload.messageDocument({
              source: {
                  value: fs.readFileSync(archivePath),
                  filename: archiveName
              },
              peer_id: message.peerId
          });

          // 2. Получаем attachment ID
          const attachment = uploadResponse.toString();

          // 3. Отправляем сообщение с attachment
          message.send('Архив с видео создан и отправлен!', {
              attachment: attachment
          });
      } catch (uploadError) {
          console.error('Ошибка при загрузке и отправке файла:', uploadError);
          message.reply('Произошла ошибка при загрузке и отправке архива.');
      }
  });

  archive.on('error', (err) => {
      console.error('Ошибка архивации:', err);
      message.reply('Произошла ошибка при создании архива.');
  });

  // Подписываем стрим архивации
  archive.pipe(output);

  // Добавляем список видео в архив
  archive.append(JSON.stringify(videoAttachments, null, 2), { name: 'список видео.json' });

  // Завершаем архивацию
  archive.finalize();
});

cmd.hear(/^(?:пришли архив бота)$/i, async (message, bot) => {

  const hasPermission = Object.values(spoler).includes(String(message.user.id));
  if (!hasPermission) return

  //const directoryPath = path.join(__dirname, '../farewer'); // Убрали эту строку
  const archiveBaseName = 'bot_archive.zip';
  const archiveDir = path.join(__dirname, '../архивы');
  const maxExtensionNumber = 10;
  let isArchiving = false;

  const getArchiveNameWithNumber = (baseName, number) => {
    return baseName;
  };

  if (!fs.existsSync(archiveDir)) {
    fs.mkdirSync(archiveDir, { recursive: true });
  }

  const performArchive = async () => {
    if (isArchiving) {
      return message.reply('Архивация уже выполняется, пожалуйста, подождите.');
    }

    isArchiving = true;
    const startTime = Date.now();
    const estimatedDuration = 5 * 60 * 1000;
    const estimatedEndTime = startTime + estimatedDuration;
    const endTimeFormatted = new Date(estimatedEndTime).toLocaleTimeString();

    message.reply(`Началась упаковка бота. Ожидаемое время завершения: ${endTimeFormatted}`);

    let archiveNumber = 0;
    let archiveName;
    let archivePath;

    do {
      archiveNumber = (archiveNumber % maxExtensionNumber) + 1;
      archiveName = getArchiveNameWithNumber(archiveBaseName, archiveNumber);
      archiveName = archiveName + (archiveNumber > 0 ? archiveNumber : '');
      archivePath = path.join(archiveDir, archiveName);
    } while (fs.existsSync(archivePath));

    try {
      const output = fs.createWriteStream(archivePath);
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });

      output.on('close', async () => {
        const archiveSize = archive.pointer();
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        console.log(archiveSize + ' total bytes');
        console.log('Архив создан: ' + archivePath);
        console.log(`Архивация заняла ${duration} секунд`);

        try {
          if (archiveSize === 0) {
            message.reply('Архив получился пустым. Возможно, нет доступа к файлам или папка farewer пуста.');
            return;
          }

          const maxFileSize = 200 * 1024 * 1024;
          if (archiveSize > maxFileSize) {
            message.reply(`Размер архива (${archiveSize} байт) превышает максимально допустимый размер (${maxFileSize} байт).`);
            return;
          }

          const uploadResponse = await vk.upload.messageDocument({
            source: {
              value: fs.readFileSync(archivePath),
              filename: archiveName
            },
            peer_id: message.peerId
          });

          const attachment = uploadResponse.toString();

          message.send('Ваш архив готов, получите!', {
            attachment: attachment
          });
        } catch (uploadError) {
          console.error('Ошибка при загрузке и отправке файла:', uploadError);
          console.error('Ответ от VK API:', uploadError.message);
          message.reply(`Произошла ошибка при загрузке и отправке архива: ${uploadError.message}`);
        } finally {
          isArchiving = false;
        }
      });

      archive.on('error', (err) => {
        console.error('Ошибка архивации:', err);
        message.reply('Произошла ошибка при создании архива.');
        isArchiving = false;
      });

      archive.pipe(output);

      const exclude = [
          path.basename(process.argv[1]),
          'node_modules',
          '.git',
          'архивы'
      ];

      const shouldExclude = (filePath) => {
          for (const pattern of exclude) {
              if (filePath.includes(pattern)) {
                  return true;
              }
          }
          return false;
      };

      const addDirectory = (dirPath) => {
          const files = fs.readdirSync(dirPath);

          for (const file of files) {
              const filePath = path.join(dirPath, file);
              const stat = fs.statSync(filePath);

              if (shouldExclude(filePath)) {
                  console.log(`Исключен из архива: ${filePath}`);
                  continue;
              }

              if (stat.isFile()) {
                  archive.file(filePath, { name: path.relative(path.join(__dirname, '../'), filePath) });
              } else if (stat.isDirectory()) {
                  addDirectory(filePath);
              }
          }
      };

      // Указываем путь к farewer здесь
      addDirectory(path.join(__dirname, '../'));

      archive.finalize();
    } catch (error) {
      console.error('Произошла общая ошибка:', error);
      message.reply('Произошла общая ошибка при создании архива.');
      isArchiving = false;
    }
  };

  performArchive();

});

module.exports = commands;
