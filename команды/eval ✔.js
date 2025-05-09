let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let users = require('../database/users.json') 
let chats = require('../database/chats.json')
let bossinfo = require('../database/bossinfo.json')
let botinfo = require('../database/botinfo.json')
let clans = require('../database/clans.json')
let val = require('../настройки/валюты.json')
let sal = require('../настройки/ссылки чатов.json')
let bog = require('../настройки/создатели бота.json')
 let help = "botinfo,val,sal,bog,"
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

cmd.hear(/^(?:eval|!eval|!)([^]+)$/i, async (message) => {
  const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131',
  });

  if (!groupInfo || groupInfo.length === 0) {
    throw new Error('Не удалось получить информацию о группе.');
  }


  const groupId = groupInfo[0].id;

  const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

   if (!admins.items.find(x => x.id === message.senderId)) return;

  const startTime = Date.now();

  try {
    const inputCode = message.args.slice(1).join(' ').trim();
    if (!inputCode) throw new Error("Нет кода для выполнения.");

  

    const result = eval(inputCode);
    const executionTime = Date.now() - startTime;


    let responseMessage = `📕 Тип: ${typeof result}\n🆚 Итог: ${JSON.stringify(result, null, '&#12288;\t')}\n\n✅ Код выполнен за ${executionTime} мс.`;

    return message.send(responseMessage);
  } catch (e) {
    console.error('Произошла ошибка при выполнении кода:', e);

    let suggestion = "Проверьте свой код на наличие следующих возможных проблем:\n";
    if (e.message.includes("is not defined")) {
      suggestion += "- Убедитесь, что все переменные и функции правильно объявлены и доступны в текущей области видимости.\n";
    } else if (e.message.includes("Unexpected token")) {
      suggestion += "- Проверьте синтаксис вашего кода. Возможно, пропущена фигурная скобка или запятая.\n";
    } else if (e.message.includes("Cannot read property")) {
      suggestion += "- Убедитесь, что вы обращаетесь к существующему объекту или свойству. Возможно, объект не был инициализирован.\n";
    } else if (e.message.includes("Unexpected end of input")) {
      suggestion += "- Проверьте, не пропущена ли фигурная скобка или закрывающая скобка.\n";
    } else {
      suggestion += "- Проверьте ваш код на наличие других синтаксических ошибок.\n";
    }

    const userFriendlyErrorMessage = `Ошибка: ${e.message}\n\n${suggestion}\n\n✅ Код выполнен за ${Date.now() - startTime} мс.`;
    return message.send(userFriendlyErrorMessage);
  }
});

cmd.hear(/^(?:zz)\s(\d+)(?:\s(\w+)(?:\s([+\-/]?=)\s*(-?\d+(\.\d+)?|true|false|.+))?)?$/i, async (message, bot) => {
  const groupInfo = await vk.api.call('groups.getById', {
    access_token: tokenData.token,
    v: '5.131',
  });

  if (!groupInfo || groupInfo.length === 0) {
    throw new Error('Не удалось получить информацию о группе.');
  }


  const groupId = groupInfo[0].id;

  const admins = await vk.api.groups.getMembers({ group_id: groupId, filter: 'managers' });

   if (!admins.items.find(x => x.id === message.senderId)) return;
    const uid = parseInt(message.args[1], 10);
    const variableName = message.args[2];
    const operation = message.args[3];
    const value = message.args[4];
    const startTime = Date.now();

    const protectedVariables = ['uid', 'id']; 
    let foundUsers = users.filter(user => user.uid === uid);

    if (foundUsers.length === 0) {
      await message.send(`Пользователь с UID ${uid} не найден.`);
      return;
    }

    const user = foundUsers[0];

    const inputCode = message.args.slice(1).join(' ').trim();

    if (!variableName) {
      const userVariables = Object.keys(user)
        .map(key => {
          const value = user[key];
          let formattedValue;

          if (typeof value === 'string') {
            formattedValue = value; 
          } else if (typeof value === 'object' && value !== null) {
            formattedValue = JSON.stringify(value);
          } else {
            formattedValue = String(value); 
          }

          return `"${key}": *${formattedValue}*`;
        })
        .join('\n');
      await bot(`${userVariables}`);
      return;
    }



    if (!user.hasOwnProperty(variableName)) {
      await message.send(`Переменная "${variableName}" не найдена у пользователя.`);
      return;
    }

    let currentValue = user[variableName];
    const variableType = typeof currentValue;


    if (!operation) {
      let resultDisplay;
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      resultDisplay = variableType === 'number' ? utils.sp(currentValue.toString()) : currentValue.toString();

      await message.send(`📕 Тип: ${variableType}\n🆚 Результат: ${resultDisplay}\n\n✅ Код выполнен за ${executionTime} мс.`);
      return;
    }


    if (protectedVariables.includes(variableName)) {
      await message.send(`Переменную "${variableName}" нельзя изменять.`);
      return;
    }


    const sendResult = async (type, result, startTime) => {
      const endTime = Date.now();
      const executionTime = endTime - startTime;
      await message.send(`📕 Тип: ${type}\n🆚 Результат: ${result}\n\n✅ Код выполнен за ${executionTime} мс.`);
    };

    if (variableType === 'number') {
      const parsedValue = parseFloat(value);
      if (isNaN(parsedValue)) {
        await message.send(`Ошибка: Значение "${value}" не является числом, а переменная "${variableName}" должна быть числом.`);
        return;
      }


      let result;

      switch (operation) {
        case '+=':
          user[variableName] = currentValue + parsedValue;
          result = user[variableName];
          break;
        case '-=':
          user[variableName] = currentValue - parsedValue;
          result = user[variableName];
          break;
        case '=':
          user[variableName] = parsedValue;
          result = user[variableName];
          break;
        case '*=':
          user[variableName] = currentValue * parsedValue;
          result = user[variableName];
          break;
        case '/=':
          if (parsedValue !== 0) {
            user[variableName] = currentValue / parsedValue;
            result = user[variableName];
          } else {
            await message.send(`Ошибка: Деление на ноль невозможно.`);
            return;
          }
          break;
        default:
          await message.send(`Неизвестная операция: ${operation}`);
          return;
      }

      await sendResult('number', result, startTime);

    } else if (variableType === 'string') {
      if (operation === '=') {
        user[variableName] = value;
        await sendResult('string', `"${value}"`, startTime);
      } else {
        await message.send(`Операция "${operation}" не поддерживается для строк.`);
      }
    } else if (variableType === 'boolean') {

      if (operation === '=') {
        if (value === 'true') {
          user[variableName] = true;
          await sendResult('boolean', 'true', startTime);
        } else if (value === 'false') {
          user[variableName] = false;
          await sendResult('boolean', 'false', startTime);
        } else {
          await message.send(`Ошибка: Для булевой переменной допустимы только значения "true" или "false".`);
          return;
        }
      } else {
        await message.send(`Операция "${operation}" не поддерживается для булевых переменных.`);
      }
    }

});



module.exports = commands;
