let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const ostats = [
  {
    id: 1,
    smile: "🐷✨",
    buff: "+100% у урону босса",
    cost: 49,
  },
];

let cars = require('../spisok/машины.js')
let trees = require('../spisok/деревья.js')
let phones = require('../spisok/телефоны.js')
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
let businesses = require("../spisok/business spisok.js")


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


// Пример использования
const tokenData = getToken();

const tokensFilePath4 = './настройки/создатели бота.json';

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
let spoler = tokenData4 ? Object.values(tokenData4)
  .map(id => Number(id)) // Преобразуем в число
  .filter(id => Number.isInteger(id) && id > 0) // Отфильтровываем не числа и <= 0
  : [];

const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 


// Функции для генерации случайного текста
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCharCase(char) {
  if (Math.random() < 0.9) { // 50% вероятность
    return char.toUpperCase();
  } else {
    return char.toLowerCase();
  }
}

//Функция для случайного выбора смайлика из массива
function getRandomEmoji(emojis) {
  return emojis[Math.floor(Math.random() * emojis.length)];
}

function mixText(originalText, emojis) {
  let mixedText = "";
  const randomEmoji = getRandomEmoji(emojis); // Получаем случайный смайлик

  for (let i = 0; i < originalText.length; i++) {
    let char = originalText[i];

    if (/[а-яА-Яa-zA-Z]/.test(char)) { // Проверяем, является ли символ буквой

      // Изменяем регистр случайным образом
      char = getRandomCharCase(char);

      // Случайная замена символов (можно расширить этот список)
      const random = Math.random();
      if (random < 0.1) { // 10% вероятность замены
        switch (char.toLowerCase()) {
          case 'о': char = '0'; break;
          case 'а': char = '@'; break;
          case 'е': char = '3'; break;
          case 'l': char = '1'; break;
          case 's': char = '$'; break;
          case 't': char = '+'; break;

        }
      }
      if (random > 0.8) { // 10% вероятность замены Русских на Английские
        switch (char.toLowerCase()) {
          case 'а': char = 'a'; break;
          case 'о': char = 'o'; break;
          case 'е': char = 'e'; break;
          case 'р': char = 'p'; break;
          case 'с': char = 'c'; break;
          case 'у': char = 'y'; break;
          case 'х': char = 'x'; break;
          case 'в': char = 'b'; break;
          case 'к': char = 'k'; break;
          case 'м': char = 'm'; break;
          case 'н': char = 'h'; break;
          case 'п': char = 'n'; break;
          case 'т': char = 'm'; break;
          case 'ё': char = 'e'; break;
          // Добавьте другие замены по желанию
        }
      }
      if (random < 0.2) { // 10% вероятность замены Английских на Русские
        switch (char.toLowerCase()) {
          case 'a': char = 'а'; break;
          case 'o': char = 'о'; break;
          case 'e': char = 'е'; break;
          case 'p': char = 'р'; break;
          case 'c': char = 'с'; break;
          case 'y': char = 'у'; break;
          case 'x': char = 'х'; break;
          case 'b': char = 'в'; break;
          case 'k': char = 'к'; break;
          case 'm': char = 'м'; break;
          case 'h': char = 'н'; break;
          case 'n': char = 'п'; break;
          // Добавьте другие замены по желанию
        }
      }
    }
    mixedText += char;
  }
  return `${randomEmoji} ${mixedText} ${randomEmoji}\n`;
}
// Подключаем массив стилей из отдельного файла
const programmerUnicodeStyles = require('../шрифты/шрифты.js');

//Дополнительные символы для украшения
const decoratorSymbols = ["꙳", "꙰", "҉", "҈", "⃟", "⃢", "⃑", "⁖", "⁘"];

//Функция для добавления случайных символов
function addRandomDecorators(text) {
    let decoratedText = "";
    for (let i = 0; i < text.length; i++) {
        decoratedText += text[i];
        if (Math.random() < 0.9) { //10% шанс добавить символ после каждой буквы
            decoratedText += decoratorSymbols[Math.floor(Math.random() * decoratorSymbols.length)];
        }
    }
    return decoratedText;
}

function getRandomUnicodeStyle() {
  const randomIndex = Math.floor(Math.random() * programmerUnicodeStyles.length);
  return programmerUnicodeStyles[randomIndex];
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

cmd.hear(/^(?:профиль|проф|🔅 Профиль|я)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1 || message.chat.type === 2) {



    const groupInfo = await vk.api.call('groups.getById', {
      access_token: tokenData.token,
      v: '5.131',
    });

    if (!groupInfo || groupInfo.length === 0) {
      throw new Error('Не удалось получить информацию о группе.');
    }

    const groupId = groupInfo[0].id;



    let follow = await vk.api.call("groups.isMember", {
      user_id: message.senderId,
      group_id: groupId,
    });

    if (follow) {
      if (message.user.questfollow === false) {
        message.user.questfollow = true;

        await bot(`Вы подписались на группу и получаете 25.000.000 ${val1}`);

        message.user.balance += 25000000;
      }
    }

    if (message.user.settings.agent === undefined) {
      message.user.settings.agent = false;
    }

    let text = ``;

    const pet = pets.find((x) => x.id === message.user.misc.pet);

    const pet2 = pets2.find((x) => x.id === message.user.misc.pet2);

    const pet3 = pets3.find((x) => x.id === message.user.misc.pet3);
    // let president = presidents.find((x) => x.id === message.user.id);

    if (message.user.uid === message.user.astats.fakeid)
      text += `🆔 Ваш ID: ${message.user.uid}\n`;
    if (message.user.uid !== message.user.astats.fakeid)
      text += `🆔 Ваш ID: ${message.user.astats.fakeid}\n`;



    if (spoler.includes(message.user.id)) text += "🔥💯 Cоздатель\n";

    if (spoler.includes(message.user.id)) {
      const programmerEmojis = ["💻", "👨‍💻", "👩‍💻", "⚙️", "🛠️", "🖥️", "💾", "💿"];
      const randomMethod = Math.random();
    
      if (randomMethod < 1) { // Теперь всегда используем Unicode
        const style = getRandomUnicodeStyle();
        const randomEmoji = getRandomEmoji(programmerEmojis); // Выбираем случайный смайлик
        text += randomEmoji + " " + style.apply("Программист") + " " + randomEmoji + "\n"; // Добавляем смайлик в начале и в конце
      }
    }
    

    if (message.user.prazdnikbussines) text += "🎄Last Christmas🎄\n";

    if (message.user.settings.imperator) text += `👑 IMPERATOR 👑\n`;

    if (message.user.settings.topdon) text += `🎉 D🌟O💖N 🎊\n`;

    if (message.user.settings.vip) text += `👑 VIP статус\n`;

    if (message.user.settings.premium) text += `👑 Premium статус\n`;

    if (message.user.settings.titan) text += `👑 Titan статус\n`;

    if (message.user.settings.joker) text += `🃏 Джокер\n`;

    if (message.user.settings.busi) text += `🤵 Бизнесмен\n`;

    if (message.user.settings.king) text += `🌈КОРОЛЬ🌈\n`;

    if (
      message.user.stock.status !== "Администратор" &&
      message.user.stock.status !== "VIP" &&
      message.user.stock.status !== "Titan" &&
      message.user.stock.status !== "Premium" &&
      message.user.stock.status !== "Игрок"
    )

      if (message.user.ostat > 0)
        text += `\n🆕 Статус: [${ostats[message.user.ostat - 1].smile}]\nБафф: ${ostats[message.user.ostat - 1].buff
          }\n\n`;

    if (message.user.settings.astat) {
      const roles = {
        1: "👤 Модератор",
        2: "🔑 Администратор",
        3: "🤗 Гл.Администратор",
        4: "♻️ Зам создателя",
        5: "❄️ Основатель",
        6: "👑 Всевышний админ",
      };


      const userRole = message.user.settings.adm;
      if (roles[userRole]) {
        text += roles[userRole] + "\n";
      }


      for (let i = 1; i < userRole; i++) {
        if (roles[i]) {
          text += roles[i] + "\n";
        }
      }


      if (userRole > 6) {
        text += "❄️ Управляющий \n";
      }
    }


    if (message.user.stock.status) {
      text += `🔅 Титул: «${message.user.stock.status}»\n`;
    } else {

    }

    text += `\n💳 Валюты:\n`;

    if (message.user.inf) {
      text += `💰 Наличными: ∞\n`;
    } else {
      text += `💰 Наличными: ${utils.sp(message.user.balance)} ${val1}\n`;
    }


    if (message.user.bank>0)
      text += `💳 В банке: ${utils.sp(message.user.bank)} ${val1}\n`;

    if (message.user.btc>0)
      text += `🌐 Биткоины: ${utils.sp(message.user.btc)} BTC\n`;


    if (message.user.rating > 0) {
    text += `👑 Рейтинг: ${utils.sp(message.user.rating)}\n`;
    }

    text += `⚡ Энергия: ${message.user.energy}\n`



    if (message.user.opit > 0) {
text += `〽️ Опыт:  ${utils.sp(message.user.opit)}\n`
  }

    if (message.user.balance2 > 0) {
      text += `💸 ${utils.sp(message.user.balance2)} ${val4}\n`;
    } 

    if (message.user.work)
      text += `⚒️ Работа: ${works[message.user.work - 1].name}\n`;
    if (message.user.marriage.partner === 0)

      if (
        message.user.transport.car ||
        message.user.transport.yacht ||
        message.user.transport.airplane ||
        message.user.transport.helicopter ||
        message.user.realty.home ||
        message.user.business ||
        message.user.misc.phone 
      ) {

        if (message.user.transport.car || message.user.transport.yacht || message.user.transport.airplane || message.user.transport.helicopter || message.user.realty.home || message.user.realty.apartment || message.user.misc.videocard || message.user.misc.farm || message.user.minertool || message.user.tree || message.user.misc.phone || message.user.misc.clock || message.user.misc.computer || message.user.business && message.user.business.length > 0 || message.user.business2 && message.user.business2.length > 0 || message.user.stars1 || message.user.stars2 || message.user.stars3 || message.user.stars4 || message.user.stars5)
              text += `\n♻️ Имущество:\n`;
      
        if (message.user.transport.car)
          text +=
            `⠀🚗` +
            (message.user.astats.car === false
              ? ` «${cars[message.user.transport.car - 1].name}»`
              : ` «${message.user.astats.car}»`) +
            (message.user.scar.gosnomer === "undefined"
              ? ``
              : ` [${message.user.scar.gosnomer}]`) +
            `\n`;

        if (message.user.transport.yacht)
          text +=
            `⠀🛥` +
            (message.user.astats.yacht === false
              ? ` «${yachts[message.user.transport.yacht - 1].name}»`
              : ` «${message.user.astats.yacht}»`) +
            `\n`;

        if (message.user.transport.airplane)
          text +=
            `⠀🛩` +
            (message.user.astats.airplane === false
              ? ` «${airplanes[message.user.transport.airplane - 1].name}»`
              : ` «${message.user.astats.airplane}»`) +
            `\n`;

        if (message.user.transport.helicopter)
          text +=
            `⠀🚁` +
            (message.user.astats.helicopter === false
              ? ` «${helicopters[message.user.transport.helicopter - 1].name}»`
              : ` «${message.user.astats.helicopter}»`) +
            `\n`;

        if (message.user.realty.home)
          text +=
            `⠀🏠` +
            (message.user.astats.homes === false
              ? ` «${homes[message.user.realty.home - 1].name}»`
              : ` «${message.user.astats.homes}»`) +
            `\n`;

        if (message.user.misc.videocard)
          text +=
            `⠀📼` +
            (message.user.astats.videocard === false
              ? ` «${videocards[message.user.misc.videocard - 1].name}»`
              : ` «${message.user.astats.videocard}»`) +
            `(${utils.sp(message.user.misc.videocard_count)} шт.)` +
            `\n`;

        if (message.user.realty.apartment)
          text +=
            `⠀🌇` +
            (message.user.astats.apartment === false
              ? ` «${apartments[message.user.realty.apartment - 1].name}»`
              : ` «${message.user.astats.apartment}»`) +
            `\n`;

        if (message.user.minertool)
          text += ` 🔧 «${minertool[message.user.minertool - 1].name}»\n`;

        if (message.user.tree)
          text += `⠀🌳 «${trees[message.user.tree - 1].name}»\n`;

        if (message.user.misc.phone)
          text += `⠀📱 «${phones[message.user.misc.phone - 1].name}»\n`;

        if (message.user.misc.clock)
          text += `⠀⌚ «${clocks[message.user.misc.clock - 1].name}»\n`;

        if (message.user.misc.pet)
          text += `⠀${pet.ico} Питомец: «${pets[message.user.misc.pet - 1].name
            }»\n`;

        if (message.user.misc.pet2)
          text += `⠀${pet2.ico} Питомец: «${pets2[message.user.misc.pet2 - 1].name
            }»\n`;

        if (message.user.misc.pet3)
          text += `⠀${pet3.ico} Питомец: «${pets3[message.user.misc.pet3 - 1].name
            }»\n`;

        if (message.user.misc.computer)
          text += `⠀🖥 «${computers[message.user.misc.computer - 1].name}»\n`;

        if (message.user.misc.farm)
          text += `⠀🔋 «${farms[message.user.misc.farm - 1].name}» (${utils.sp(
            message.user.misc.farm_count
          )} шт.)\n`;

        if (message.user.business && message.user.business.length > 0) {
          text += `🏢 Бизнесы на ${val4}:\n`;
          for (let business of message.user.business) {
            const businessInfo = businesses[business.id - 1][business.upgrade - 1];
            text += `${businessInfo.name}\n`;
          }
        } else {

        }

        if (message.user.business2 && message.user.business2.length > 0) {
          text += '🏢 Бизнесы на валюту:\n';
          for (let business2 of message.user.business2) {
            const businessInfo = businesses2[business2.id - 1][business2.upgrade - 1];
            text += `${businessInfo.icon} ${businessInfo.name}\n`;
          }
        } else {

        }

        if (
          message.user.stars1 ||
          message.user.stars2 ||
          message.user.stars3 ||
          message.user.stars4 ||
          message.user.stars5
        )
          text += `\n💫 Звезды:\n`;

        if (message.user.stars1) text += `⠀☀ Солнце\n`;

        if (message.user.stars2) text += `⠀🌠 Сириус\n`;

        if (message.user.stars3) text += `⠀🛑 Красный гигант\n`;

        if (message.user.stars4) text += `⠀🧬 Плазмовый гигант\n`;

        if (message.user.stars5) text += `⠀💰 Донатный гигант\n`;
      }

    text += `\n\n⏳ ${message.user.regDate}`;

    return bot(`ваш игровой профиль:\n${text}`, {
      attachment: message.user.photo,
      keyboard: JSON.stringify({
        "inline": true,
        "buttons": [
          [{
            "action": {
              "type": "text",
              payload: JSON.stringify({ command: `топик` }),
              "label": `👀 Аниме`
            },
            "color": "positive"
          }],
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

});

cmd.hear(/^(?:профиль фото|проф фото|пфото|фпроф)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1 || message.chat.type === 2) {
        let photoUrl = message.args[1];
        let isValid = false;

        if (photoUrl.startsWith("https://vk.com/")) {
            photoUrl = photoUrl.slice(15);
            isValid = true;
        } else if (
            photoUrl.startsWith("photo-") ||
            photoUrl.startsWith("video-") ||
            photoUrl.startsWith("audio") ||
            photoUrl.startsWith("doc") ||
            photoUrl.startsWith("photo") // Добавлено это условие
        ) {
            isValid = true;
        }

        if (isValid) {
            message.user.photo = photoUrl;
            try {
                await bot(`Ваш профиль изменен 🤗`, {
                    attachment: photoUrl,
                });
            } catch (error) {
                console.error("Ошибка при отправке сообщения:", error);
                return bot(`Ошибка: Не удалось установить фотографию.`);
            }

        } else {
            return bot(
                `Ошибка: Неверный формат ссылки.`
            );
        }
    }
});

module.exports = commands;