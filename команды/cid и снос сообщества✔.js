let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let chats = require('../database/chats.json')

let double = require('../database/users.json')
let config = require('../database/settings.json');
const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';

const tokensFilePath4 = './настройки/создатели бота.json';

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

function getToken4() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath4, 'utf8'));
    return tokens;
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null;
  }
}

const tokenData4 = getToken4();
const tokenData = getToken();

const chatlogi = tokenData.chatlogi;
const spoler = tokenData4;
const {
  VK
} = require('vk-io');
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
const val4 = tokenData3.val4


cmd.hear(/(?:cid)/i, async (message, bot) => {
  if (message.user.astats.tema === 2) {
    if (!message.isChat) {
      const notChatMsg = '🖕 Нахуй иди, эта команда только в беседе работает, дебил!';
      await bot(notChatMsg);
      return notChatMsg;
  }
  
  if (typeof message.chatId === 'number') { // Проверка, еблан
      const chatIdMsg = `💬 ID беседы: ${message.chatId}, вот, держи, мудак.`;
      await message.send(chatIdMsg);
      return chatIdMsg;
  } else {
      console.error('Блядь, message.chatId — хуйня, а не число!'); // Логируем, что ты еблан
      const errorMsg = '⚠️ Ошибка, долбоёб: ID беседы не вытащить. Иди нахуй или зови админа, если не спиздил его.';
      await bot(errorMsg);
      return errorMsg;
  }
  }
  if (message.user.astats.tema === 1) {
  if (!message.isChat) {
    const notChatMsg = '⛔️ Эта команда работает только в беседе!';
    await bot(notChatMsg);
    return notChatMsg;
  }

  if (typeof message.chatId === 'number') { // Добавлена проверка типа
    const chatIdMsg = `💬 ID беседы: ${message.chatId}`;
    await message.send(chatIdMsg);
    return chatIdMsg;
  } else {
    console.error('Ошибка: message.chatId имеет неверный тип или отсутствует.'); // Логирование ошибки
    const errorMsg = '⚠️ Ошибка: Не удалось получить ID беседы. Пожалуйста, попробуйте позже или обратитесь к администратору. 😔';
    await bot(errorMsg);
    return errorMsg;
  }
}
});

cmd.hear(/^(?:снести хуи)$/i, async (message, bot) => {
  if (message.user.settings.adm < 1234) return;

  try {
    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;

    const postResponse = await vk.api.wall.post({
      owner_id: -groupId,
      message: `vto.pe`,
      attachments: '',
    });

    const postId = postResponse.post_id;

    config.fortuna = postId;
    config.fortunacount = 100;
    fs.writeFileSync('./database/settings.json', JSON.stringify(config, null, 4));


    const successMsg = `✅ Пост "Фортуна" успешно создан! 🎉 Post ID: ${postId}`;
    await vk.api.messages.send({
      peer_id: message.peerId,
      message: successMsg,
      attachment: `wall-${groupId}_${postId}`,
      random_id: 0
    });
    return successMsg

  } catch (error) {
    console.error('Ошибка при создании поста "Фортуна":', error);
    const errorMsg = `❌ Ошибка при создании поста "Фортуна"! 😥 ${error.message}`;
    await bot(errorMsg);
    return errorMsg
  }
});

module.exports = commands;