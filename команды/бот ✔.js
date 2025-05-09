let utils = require('../utils.js')

const { VK } = require('vk-io');

let double = require('../database/users.json')

const fs = require('fs'); 
const { console } = require('inspector');

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

function saveTokens(token, spoler, chatlogi) {
  const tokens = {
    token: token,
    spoler: spoler,
    chatlogi: chatlogi };

  try {
    fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
    console.log('Токены успешно сохранены.');
  } catch (error) {
    console.error('Ошибка при сохранении токенов:', error);
  }
}

// Пример использования
const tokenData = getToken();



const vk = require('../vk-api.js'); 

const commands =[]

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

cmd.hear(/^(?:бот|о боте|техническая информация|статистика)$/i, async (message, bot) => {
  const smileng = utils.pick(['🌷', '🌸', '🌹', '🌺', '🌼', '💐', '❤️', '💓', '💕']);
  let subs;

  const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131', // Версия API
  });

  if (!groupInfo || groupInfo.length === 0) {
    throw new Error('Не удалось получить информацию о группе.');
  }

  // Извлекаем group_id из первого элемента массива groups
  const groupId = groupInfo[0].id;

  try {
    subs = await vk.api.groups.getMembers({ group_id: groupId });
  } catch (error) {
    return bot(`🚨 Ошибка при получении данных группы: ${error.message}`);
  }

  const memberIds = subs.items;
  let onlineUsersCount = 0;

  try {
    const usersInfo = await vk.api.users.get({ user_ids: memberIds.join(','), fields: 'online' });
    onlineUsersCount = usersInfo.filter(user => user.online === 1).length;
  } catch (error) {
    return bot(`🚨 Ошибка при получении статуса пользователей: ${error.message}`);
  }

  let bannedCount = double.filter(user => user.bans.ban === true).length;

  const goals = [10, 100, 200, 300, 500, 1000, 1500, 2000, 2500, 3700, 4500, 5500, 10000]; // Массив с целями
  const subscribersCount = subs.count;
  const groupName = groupInfo[0].name;

  // Найдем ближайшую цель
  let nextGoal = goals.find(goal => goal > subscribersCount) || "нет"; // Если цели больше не осталось
  let subscribersToNextGoal = nextGoal !== "нет" ? nextGoal - subscribersCount : "все цели достигнуты!";

  // Расчет времени работы бота
  const uptime = process.uptime(); // Время работы в секундах
  const uptimeYears = Math.floor(uptime / (60 * 60 * 24 * 365.25)); // Учитываем високосные года
  const uptimeMonths = Math.floor((uptime % (60 * 60 * 24 * 365.25)) / (60 * 60 * 24 * 30.44)); // Приблизительное среднее кол-во дней в месяце
  const uptimeDays = Math.floor((uptime % (60 * 60 * 24 * 30.44)) / (60 * 60 * 24));
  const uptimeHours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
  const uptimeMinutes = Math.floor((uptime % (60 * 60)) / 60);
  const uptimeSeconds = Math.floor(uptime % 60);

  let uptimeString = "";
  if (uptimeYears > 0) {
    uptimeString += `${uptimeYears} г. `;
  }
  if (uptimeMonths > 0) {
    uptimeString += `${uptimeMonths} мес. `;
  }
  if (uptimeDays > 0) {
    uptimeString += `${uptimeDays} дн. `;
  }
  if (uptimeHours > 0) {
    uptimeString += `${uptimeHours} ч. `;
  }
  if (uptimeMinutes > 0) {
    uptimeString += `${uptimeMinutes} м. `;
  }
  uptimeString += `${uptimeSeconds} с.`;


  return bot(`🤖 Техническая информация о боте:

🌐 Группа: ${groupName}

👥 Подписчиков: ${utils.sp(subscribersCount)} ч.

☃️ Игроков в боте: ${utils.sp(double.length)}

🚫 Заблокированных игроков: ${utils.sp(bannedCount)}

🌍 Онлайн пользователей: ${utils.sp(onlineUsersCount)}

⏰ Время работы: ${uptimeString}

${smileng}`);
});

module.exports = commands;
