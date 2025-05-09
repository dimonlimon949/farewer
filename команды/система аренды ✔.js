let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

let yachts = require('../spisok/яхты.js')
let homes = require('../spisok/дома.js')
let minertool = require('../spisok/инструменты.js')
let computers = require('../spisok/компьютеры.js')
let apartments = require('../spisok/апартаменты.js')
let airplanes = require('../spisok/самолеты.js')
let phones = require('../spisok/телефоны.js')
let helicopters = require('../spisok/вертолеты.js')


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
const {VK} = require('vk-io');
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

function addZero(num) {
    return num < 10 ? '' + num : num;
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
    text += `${addZero(m)} м. ${addZero(s)} с.`;

    return text.trim(); // Убираем лишние пробелы
}

cmd.hear(/^(?:аренда|арендовать|🎉 Аренда)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        try {
            const now = Date.now();

            const getYachtColor = () => (message.user.transport.yacht ? (message.user.arend.yaxta >= now ? "secondary" : "positive") : "negative");
            const getHomeColor = () => (message.user.realty.home ? (message.user.arend.dom >= now ? "secondary" : "positive") : "negative");
            const getToolColor = () => (message.user.minertool ? (message.user.arend.instrm >= now ? "secondary" : "positive") : "negative");
            const getComputerColor = () => (message.user.misc.computer ? (message.user.arend.pk >= now ? "secondary" : "positive") : "negative");
            const getApartmentColor = () => (message.user.realty.apartment ? (message.user.arend.kvar >= now ? "secondary" : "positive") : "negative");
            const getAirplaneColor = () => (message.user.transport.airplane ? (message.user.arend.sam >= now ? "secondary" : "positive") : "negative");
            const getPhoneColor = () => (message.user.misc.phone ? (message.user.arend.tel >= now ? "secondary" : "positive") : "negative");
            const getHelicopterColor = () => (message.user.transport.helicopter ? (message.user.arend.vert >= now ? "secondary" : "positive") : "negative");

            await message.send('Выберите, что хотите сдать в аренду:', {
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать яхту`}),
                                "label": `🛥️ Яхты`
                            },
                            "color": getYachtColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать дом`}),
                                    "label": `🏠 Дома`
                                },
                                "color": getHomeColor()
                            }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать инструменты`}),
                                "label": `⛏️ Инструменты`
                            },
                            "color": getToolColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать комп`}),
                                    "label": `💻 Компьютеры`
                                },
                                "color": getComputerColor()
                            }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать квартиру`}),
                                "label": `🏢 Квартиры`
                            },
                            "color": getApartmentColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать самолет`}),
                                    "label": `✈️ Самолеты`
                                },
                                "color": getAirplaneColor()
                            }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({command: `арендовать телефон`}),
                                "label": `📱 Телефоны`
                            },
                            "color": getPhoneColor()
                        },
                            {
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `арендовать вертолет`}),
                                    "label": `🚁 Вертолеты`
                                },
                                "color": getHelicopterColor()
                            }]
                    ]
                })
            });
        } catch (error) {
            console.error("Ошибка при отправке сообщения с кнопками:", error);
            message.send('Произошла ошибка при обработке запроса.'); // Сообщаем пользователю об ошибке
        }
    } else {
        return
    }
})

cmd.hear(/^(?:арендовать дом)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        if (message.user.arend.dom >= Date.now()) {
            return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.dom - Date.now())} ⏳`);
        }
        if (!message.user.realty.home) return bot(`у вас нет дома`, {
            keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                    [{
                        "action": {
                            "type": "text",
                            payload: JSON.stringify({command: `дома`}),
                            "label": `🏠 Дома`
                        },
                        "color": "positive"
                    }]
                ]
            })
        });

        let a = Math.floor(homes[message.user.realty.home - 1].cost * 0.02);

        message.user.balance += Math.floor(
            homes[message.user.realty.home - 1].cost * 0.02
        );

        message.user.arend.dom = Date.now() + 10800000;


        if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
            message.user.now.kv6 = true;
            message.user.misc.farm_count += 10;
            await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
              })
    }

        return bot(
            `вы арендовали свой дом за ${utils.sp(
                a
            )} ${val1} 🏡`
        );

    } else {
        return
    }
})

cmd.hear(/^(?:арендовать яхту)$/i, async (message, bot) => {
    if (message.user.arend.yaxta >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.yaxta - Date.now())} ⏳`);
    }
    if (!message.user.transport.yacht) return bot(`у вас нет яхты`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `яхты`}),
                        "label": `🛥️ Яхты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(yachts[message.user.transport.yacht - 1].cost * 0.02);

    message.user.balance += Math.floor(
        yachts[message.user.transport.yacht - 1].cost * 0.02
    );
    message.user.arend.yaxta = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
          })
}
    return bot(
        `вы арендовали свою яхту за ${utils.sp(
            a
        )} ${val1} 🚤`
    );

})

cmd.hear(/^(?:арендовать инструменты)$/i, async (message, bot) => {
    if (message.user.arend.instrm >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.instrm - Date.now())} ⏳`);
    }
    if (!message.user.minertool) return bot(`у вас нет инструмента`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `инструменты`}),
                        "label": `⛏️ Инструменты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(minertool[message.user.minertool - 1].cost * 0.02);

    message.user.balance += Math.floor(
        minertool[message.user.minertool - 1].cost * 0.02
    );

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
          })
}

    message.user.arend.instrm = Date.now() + 10800000;
    return bot(
        `вы арендовали свои инструменты за ${utils.sp(
            a
        )} ${val1} 🔧`
    );

})

cmd.hear(/^(?:арендовать комп)$/i, async (message, bot) => {
    if (message.user.arend.pk >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.pk - Date.now())} ⏳`);
    }
    if (!message.user.misc.computer) return bot(`у вас нет компьютера`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `компьютеры`}),
                        "label": `💻 Компьютеры`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(computers[message.user.misc.computer - 1].cost * 0.02);

    message.user.balance += Math.floor(
        computers[message.user.misc.computer - 1].cost * 0.02
    );

    message.user.arend.pk = Date.now() + 10800000;

    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
          })
}
    return bot(
        `вы арендовали свой компьютер за ${utils.sp(
            a
        )} ${val1} 🖥️`
    );

})


cmd.hear(/^(?:арендовать квартиру)$/i, async (message, bot) => {
    if (message.user.arend.kvar >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.kvar - Date.now())} ⏳`);
    }
    if (!message.user.realty.apartment) return bot(`у вас нет квартиры`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `квартиры`}),
                        "label": `🏠 Квартиры`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(
        apartments[message.user.realty.apartment - 1].cost * 0.02
    );

    message.user.balance += Math.floor(
        apartments[message.user.realty.apartment - 1].cost * 0.02
    );
    message.user.arend.kvar = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
          })
}
    return bot(
        `вы арендовали свою квартиру за ${utils.sp(
            a
        )} ${val1} 🌆`
    );

})

cmd.hear(/^(?:арендовать телефон)$/i, async (message, bot) => {
    if (message.user.arend.tel >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.tel - Date.now())} ⏳`);
    }
    if (!message.user.misc.phone) return bot(`у вас нет телефона`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `телефоны`}),
                        "label": `📱 Телефоны`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(phones[message.user.misc.phone - 1].cost * 0.02);

    message.user.balance += Math.floor(
        phones[message.user.misc.phone - 1].cost * 0.02
    );
    message.user.arend.tel = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
          })
}
    return bot(
        `вы арендовалии свой телефон за ${utils.sp(
            a
        )} ${val1} 📲`
    );

})

cmd.hear(/^(?:арендовать самолет)$/i, async (message, bot) => {
    if (message.user.arend.sam >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.sam - Date.now())} ⏳`);
    }
    if (!message.user.transport.airplane) return bot(`у вас нет самолёта`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `самолеты`}),
                        "label": `🛩️ Самолеты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(
        airplanes[message.user.transport.airplane - 1].cost * 0.02
    );

    message.user.balance += Math.floor(
        airplanes[message.user.transport.airplane - 1].cost * 0.02
    );
    message.user.arend.sam = Date.now() + 10800000;
    return bot(
        `вы арендовали свой самолёт за ${utils.sp(
            a
        )} ${val1} 🛩️`
    );

})

cmd.hear(/^(?:арендовать вертолет)$/i, async (message, bot) => {
    if (message.user.arend.vert >= Date.now()) {
        return bot(`⏳ Арендовать можно через ${unixStampLefta(message.user.arend.vert - Date.now())} ⏳`);
    }
    if (!message.user.transport.helicopter) return bot(`у вас нет вертолета`, {
        keyboard: JSON.stringify({
            "inline": true,
            "buttons": [
                [{
                    "action": {
                        "type": "text",
                        payload: JSON.stringify({command: `вертолеты`}),
                        "label": `🚁 Вертолеты`
                    },
                    "color": "positive"
                }]
            ]
        })
    });
    let a = Math.floor(
        helicopters[message.user.transport.helicopter - 1].cost * 0.02
    );

    message.user.balance += Math.floor(
        helicopters[message.user.transport.helicopter - 1].cost * 0.02
    );
    message.user.arend.vert = Date.now() + 10800000;
    if (message.user.now.kv1 && message.user.now.kv2 && message.user.now.kv3 && message.user.now.kv4 && message.user.now.kv5 && !message.user.now.kv6){
        message.user.now.kv6 = true;
        message.user.misc.farm_count += 10;
        await bot(`⚠️ Вы успешно выполнили 6 задание! сдать в аренду имущество!

Награда - 10 ферм

💡 Регулярно арендуйте свое имущество ведь это халявная прибыль!`, {
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
          })
}
    return bot(
        `вы арендовали свой вертолёт за ${utils.sp(
            a
        )} ${val1} 🚁`
    );

})


cmd.hear(/^(?:яхты|🛥 Яхты|яхта)\s?([0-9]+)?$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        let smileng = utils.pick([
            `🌷`,
            `🌸`,
            `🌹`,
            `🌺`,
            `🌼`,
            `💐`,
            `❤️`,
            `💓`,
            `💕`,
        ]);

        if (!message.args[1])
            return bot(`яхты:

${message.user.transport.yacht === 1 ? "✔️" : "✖️"} 1. Ванна 
(${utils.sp(yachts.find((x) => x.id === Number(1)).cost
            )} ${val1})
${message.user.transport.yacht === 2 ? "✔️" : "✖️"
            } 2. Nauticat 331 
(${utils.sp(yachts.find((x) => x.id === Number(2)).cost
            )} ${val1})
${message.user.transport.yacht === 3 ? "✔️" : "✖️"
            } 3. Nordhavn 56 MS
(${utils.sp(yachts.find((x) => x.id === Number(3)).cost
            )} ${val1})
${message.user.transport.yacht === 4 ? "✔️" : "✖️"
            } 4. Princess 60 
(${utils.sp(yachts.find((x) => x.id === Number(4)).cost
            )} ${val1})
${message.user.transport.yacht === 5 ? "✔️" : "✖️"
            } 5. Azimut 70 
(${utils.sp(yachts.find((x) => x.id === Number(5)).cost
            )} ${val1})
${message.user.transport.yacht === 6 ? "✔️" : "✖️"
            } 6. Dominator 40M 
(${utils.sp(yachts.find((x) => x.id === Number(6)).cost
            )} ${val1})
${message.user.transport.yacht === 7 ? "✔️" : "✖️"
            } 7. Moonen 124 
(${utils.sp(yachts.find((x) => x.id === Number(7)).cost
            )} ${val1})
${message.user.transport.yacht === 8 ? "✔️" : "✖️"
            } 8. Wider 150 
${utils.sp(yachts.find((x) => x.id === Number(8)).cost
            )} ${val1})
${message.user.transport.yacht === 9 ? "✔️" : "✖️"
            } 9. Palmer Johnson 42M SuperSport 
(${utils.sp(yachts.find((x) => x.id === Number(9)).cost
            )} ${val1})
${message.user.transport.yacht === 10 ? "✔️" : "✖️"
            } 10. Wider 165 
(${utils.sp(yachts.find((x) => x.id === Number(10)).cost
            )} ${val1})
${message.user.transport.yacht === 11 ? "✔️" : "✖️"
            } 11. Eclipse 
(${utils.sp(yachts.find((x) => x.id === Number(11)).cost
            )} ${val1})
${message.user.transport.yacht === 12 ? "✔️" : "✖️"
            } 12. Dubai 
(${utils.sp(yachts.find((x) => x.id === Number(12)).cost
            )} ${val1})
${message.user.transport.yacht === 13 ? "✔️" : "✖️"
            } 13. Streets of Monaco 
(${utils.sp(yachts.find((x) => x.id === Number(13)).cost
            )} ${val1})

🛒 Для покупки введите «Яхта [номер]»

${smileng}`);

        const sell = yachts.find((x) => x.id === Number(message.args[1]));

        if (!sell) return;

        if (message.user.transport.yacht)
            return bot(
                `у вас уже есть яхта (${yachts[message.user.transport.yacht - 1].name
                }), введите "Продать яхту"`, {
                    keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                            [{
                                "action": {
                                    "type": "text",
                                    payload: JSON.stringify({command: `продать яхту`}),
                                    "label": `💸 Продать яхту`
                                },
                                "color": "positive"
                            }]
                        ]
                    })
                }
            );

        if (message.user.balance < sell.cost) return bot(`недостаточно денег`);
        else if (message.user.balance >= sell.cost) {
            message.user.balance -= sell.cost;

            message.user.transport.yacht = sell.id;

            return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1}`);
        }
    }
});


cmd.hear(/^(?:самол[её]т|🛩 Самолеты|самол[её]ты)\s?([0-9]+)?$/i,async (message, bot) => {
        if (!message.isChat || message.chat.type === 1) {
            let smileng = utils.pick([
                `🌷`,
                `🌸`,
                `🌹`,
                `🌺`,
                `🌼`,
                `💐`,
                `❤️`,
                `💓`,
                `💕`,
            ]);

            if (!message.args[1])
                return bot(`самолеты:

${message.user.transport.airplane === 1 ? "✔️" : "✖️"
                } 1. Параплан 
${utils.sp(airplanes.find((x) => x.id === Number(1)).cost)} ${val1})
${message.user.transport.airplane === 2 ? "✔️" : "✖️"
                } 2. АН-2 
(${utils.sp(airplanes.find((x) => x.id === Number(2)).cost
                )} ${val1})
${message.user.transport.airplane === 3 ? "✔️" : "✖️"
                } 3. Cessna-172E 
(${utils.sp(airplanes.find((x) => x.id === Number(3)).cost
                )} ${val1})
${message.user.transport.airplane === 4 ? "✔️" : "✖️"
                } 4. Supermarine Spitfire 
(${utils.sp(airplanes.find((x) => x.id === Number(4)).cost
                )} ${val1})
${message.user.transport.airplane === 5 ? "✔️" : "✖️"
                } 5. BRM NG-5 
(${utils.sp(airplanes.find((x) => x.id === Number(5)).cost
                )} ${val1})
${message.user.transport.airplane === 6 ? "✔️" : "✖️"
                } 6. Cessna T210 
(${utils.sp(airplanes.find((x) => x.id === Number(6)).cost
                )} ${val1})
${message.user.transport.airplane === 7 ? "✔️" : "✖️"
                } 7. Beechcraft 1900D 
(${utils.sp(airplanes.find((x) => x.id === Number(7)).cost
                )} ${val1})
${message.user.transport.airplane === 8 ? "✔️" : "✖️"
                } 8. Cessna 550 
(${utils.sp(airplanes.find((x) => x.id === Number(8)).cost
                )} ${val1})
${message.user.transport.airplane === 9 ? "✔️" : "✖️"
                } 9. Hawker 4000 
(${utils.sp(airplanes.find((x) => x.id === Number(9)).cost
                )} ${val1})
${message.user.transport.airplane === 10 ? "✔️" : "✖️"
                } 10. Learjet 31 
(${utils.sp(airplanes.find((x) => x.id === Number(10)).cost
                )} ${val1})
${message.user.transport.airplane === 11 ? "✔️" : "✖️"
                } 11. Airbus A318 
(${utils.sp(airplanes.find((x) => x.id === Number(11)).cost
                )} ${val1})
${message.user.transport.airplane === 12 ? "✔️" : "✖️"
                } 12. F-35A 
(${utils.sp(airplanes.find((x) => x.id === Number(12)).cost
                )} ${val1})
${message.user.transport.airplane === 13 ? "✔️" : "✖️"
                } 13. Boeing 747-430 Custom 
(${utils.sp(airplanes.find((x) => x.id === Number(13)).cost
                )} ${val1})
${message.user.transport.airplane === 14 ? "✔️" : "✖️"
                } 14. C-17A Globemaster III 
(${utils.sp(airplanes.find((x) => x.id === Number(14)).cost
                )} ${val1})
${message.user.transport.airplane === 15 ? "✔️" : "✖️"
                } 15. F-22 Raptor 
(${utils.sp(airplanes.find((x) => x.id === Number(15)).cost
                )} ${val1})
${message.user.transport.airplane === 16 ? "✔️" : "✖️"
                } 16. Airbus 380 Custom                
(${utils.sp(airplanes.find((x) => x.id === Number(16)).cost
                )} ${val1})
${message.user.transport.airplane === 17 ? "✔️" : "✖️"
                } 17. B-2 Spirit Stealth Bomber 
(${utils.sp(airplanes.find((x) => x.id === Number(17)).cost
                )} ${val1})

🛒 Для покупки введите «Самолет [номер]»

${smileng}`);

            const sell = airplanes.find((x) => x.id === Number(message.args[1]));

            if (!sell) return;

            if (message.user.transport.airplane)
                return bot(
                    `у вас уже есть самолёт (${airplanes[message.user.transport.airplane - 1].name
                    }), введите "Продать самолёт"`, {
                        keyboard: JSON.stringify({
                            "inline": true,
                            "buttons": [
                                [{
                                    "action": {
                                        "type": "text",
                                        payload: JSON.stringify({command: `продать самолет`}),
                                        "label": `💸 Продать самолет`
                                    },
                                    "color": "positive"
                                }]
                            ]
                        })
                    }
                );

            if (message.user.balance < sell.cost) return bot(`недостаточно денег`);
            else if (message.user.balance >= sell.cost) {
                message.user.balance -= sell.cost;

                message.user.transport.airplane = sell.id;

                return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1}`);
            }
        }
    }
);

cmd.hear(/^(?:вертол[её]т|🚁 Вертолеты|вертол[её]ты)\s?([0-9]+)?$/i,async (message, bot) => {
        if (!message.isChat || message.chat.type === 1) {
            let smileng = utils.pick([
                `🌷`,
                `🌸`,
                `🌹`,
                `🌺`,
                `🌼`,
                `💐`,
                `❤️`,
                `💓`,
                `💕`,
            ]);

            if (!message.args[1])
                return bot(`вертолеты:

${message.user.transport.helicopter === 1 ? "✔️" : "✖️"
                } 1. Шарик с пропеллером 
(${utils.sp(helicopters.find((x) => x.id === Number(1)).cost
                )} ${val1})
${message.user.transport.helicopter === 2 ? "✔️" : "✖️"
                } 2. RotorWay Exec 162F 
(${utils.sp(helicopters.find((x) => x.id === Number(2)).cost
                )} ${val1})
${message.user.transport.helicopter === 3 ? "✔️" : "✖️"
                } 3. Robinson R44 
(${utils.sp(helicopters.find((x) => x.id === Number(3)).cost
                )} ${val1})
${message.user.transport.helicopter === 4 ? "✔️" : "✖️"
                } 4. Hiller UH-12C 
(${utils.sp(helicopters.find((x) => x.id === Number(4)).cost
                )} ${val1})
${message.user.transport.helicopter === 5 ? "✔️" : "✖️"
                } 5. AW119 Koala 
(${utils.sp(helicopters.find((x) => x.id === Number(5)).cost
                )} ${val1})
${message.user.transport.helicopter === 6 ? "✔️" : "✖️"
                } 6. MBB BK 117 
(${utils.sp(helicopters.find((x) => x.id === Number(6)).cost
                )} ${val1})
${message.user.transport.helicopter === 7 ? "✔️" : "✖️"
                } 7. Eurocopter EC130 
(${utils.sp(helicopters.find((x) => x.id === Number(7)).cost
                )} ${val1})
${message.user.transport.helicopter === 8 ? "✔️" : "✖️"
                } 8. Leonardo AW109 Power 
(${utils.sp(helicopters.find((x) => x.id === Number(8)).cost
                )} ${val1})
${message.user.transport.helicopter === 9 ? "✔️" : "✖️"
                } 9. Sikorsky S-76 
(${utils.sp(helicopters.find((x) => x.id === Number(9)).cost
                )} ${val1})
${message.user.transport.helicopter === 10 ? "✔️" : "✖️"
                } 10. Bell 429WLG 
(${utils.sp(helicopters.find((x) => x.id === Number(10)).cost
                )} ${val1})
${message.user.transport.helicopter === 11 ? "✔️" : "✖️"
                } 11. NHI NH90 
(${utils.sp(helicopters.find((x) => x.id === Number(11)).cost
                )} ${val1})
${message.user.transport.helicopter === 12 ? "✔️" : "✖️"
                } 12. Kazan Mi-35M 
(${utils.sp(helicopters.find((x) => x.id === Number(12)).cost
                )} ${val1})
${message.user.transport.helicopter === 13 ? "✔️" : "✖️"
                } 13. Bell V-22 Osprey 
(${utils.sp(helicopters.find((x) => x.id === Number(13)).cost
                )} ${val1})

🛒 Для покупки введите «Вертолет [номер]»

${smileng}`);

            const sell = helicopters.find((x) => x.id === Number(message.args[1]));

            if (!sell) return;

            if (message.user.transport.helicopter)
                return bot(
                    `у вас уже есть вертолёт (${homes[message.user.transport.helicopter - 1].name
                    }), введите "Продать вертолёт"`, {
                        keyboard: JSON.stringify({
                            "inline": true,
                            "buttons": [
                                [{
                                    "action": {
                                        "type": "text",
                                        payload: JSON.stringify({command: `продать вертолет`}),
                                        "label": `💸 Продать вертолет`
                                    },
                                    "color": "positive"
                                }]
                            ]
                        })
                    }
                );

            if (message.user.balance < sell.cost) return bot(`недостаточно денег`);
            else if (message.user.balance >= sell.cost) {
                message.user.balance -= sell.cost;
                message.user.transport.helicopter = sell.id;

                return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1}`);
            }
        }
    }
);

cmd.hear(/^(?:квартира|🌇 Квартиры|квартиры)\s?([0-9]+)?$/i,async (message, bot) => {
        if (!message.isChat || message.chat.type === 1) {
            if (!message.args[1])
                return bot(`квартиры:

${message.user.realty.apartment === 1 ? "✔️" : "✖️"} 1. Чердак
(${utils.sp(apartments.find((x) => x.id === Number(1)).cost
                )} ${val1})
${message.user.realty.apartment === 2 ? "✔️" : "✖️"
                } 2. Квартира в общежитии 
(${utils.sp(apartments.find((x) => x.id === Number(2)).cost
                )} ${val1})
${message.user.realty.apartment === 3 ? "✔️" : "✖️"
                } 3. Однокомнатная квартира 
(${utils.sp(apartments.find((x) => x.id === Number(3)).cost
                )} ${val1})
${message.user.realty.apartment === 4 ? "✔️" : "✖️"
                } 4. Двухкомнатная квартира 
(${utils.sp(apartments.find((x) => x.id === Number(4)).cost 
                )} ${val1})
${message.user.realty.apartment === 5 ? "✔️" : "✖️"
                } 5. Четырехкомнатная квартира 
(${utils.sp(apartments.find((x) => x.id === Number(5)).cost
                )} ${val1})
${message.user.realty.apartment === 6 ? "✔️" : "✖️"
                } 6. Квартира в центре Москвы 
(${utils.sp(apartments.find((x) => x.id === Number(6)).cost
                )} ${val1})
${message.user.realty.apartment === 7 ? "✔️" : "✖️"
                } 7. Двухуровневая квартира 
(${utils.sp(apartments.find((x) => x.id === Number(7)).cost
                )} ${val1})
${message.user.realty.apartment === 8 ? "✔️" : "✖️"
                } 8. Квартира с Евроремонтом 
(${utils.sp(apartments.find((x) => x.id === Number(8)).cost
                )} ${val1})
                    
🛒 Для покупки введите «Квартира [номер]»`);
                    
                                const sell = apartments.find((x) => x.id === Number(message.args[1]));
                    
                                if (!sell) return;
                    
                                if (message.user.realty.apartment)
                                    return bot(
                                        `у вас уже есть квартира (${apartments[message.user.realty.apartment - 1].name
                                        }), чтобы её продать введите «Продать квартиру»`, {
                                            keyboard: JSON.stringify({
                                                "inline": true,
                                                "buttons": [
                                                    [{
                                                        "action": {
                                                            "type": "text",
                                                            payload: JSON.stringify({command: `продать квартиру`}),
                                                            "label": `💸 Продать квартиру`
                                                        },
                                                        "color": "positive"
                                                    }]
                                                ]
                                            })
                                        }
                                    );
                    
                                if (message.user.balance < sell.cost)
                                    return bot(
                                        `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                                            message.user.balance
                                        )} ${val1} 💵`
                                    );
                                else if (message.user.balance >= sell.cost) {
                                    message.user.balance -= sell.cost;
                    
                                    message.user.realty.apartment = sell.id;
                    
                                    return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1}`);
                                }
                            }
                        }
                    );
                    
cmd.hear(/^(?:телефон|📱 Телефоны|телефоны)\s?([0-9]+)?$/i,async (message, bot) => {
                            if (!message.isChat || message.chat.type === 1) {
                                if (!message.args[1])
                                    return bot(`телефоны:
                    
${message.user.misc.phone === 1 ? "✔️" : "✖️"} 1. Nokia 108 
(${utils.sp(phones.find((x) => x.id === Number(1)).cost
                )} ${val1})
${message.user.misc.phone === 2 ? "✔️" : "✖️"} 2. Nokia 3310 
(${utils.sp(phones.find((x) => x.id === Number(2)).cost
                )} ${val1})
${message.user.misc.phone === 3 ? "✔️" : "✖️"} 3. BQ Aquaris M5 
(${utils.sp(phones.find((x) => x.id === Number(3)).cost
                )} ${val1})
${message.user.misc.phone === 4 ? "✔️" : "✖️"} 4. ASUS ZenFone 4 
(${utils.sp(phones.find((x) => x.id === Number(4)).cost
                                    )} ${val1})
${message.user.misc.phone === 5 ? "✔️" : "✖️"
                } 5. Samsung Galaxy S11 
(${utils.sp(phones.find((x) => x.id === Number(5)).cost
                )} ${val1})
${message.user.misc.phone === 6 ? "✔️" : "✖️"} 6. Escobar Fold 1 
(${utils.sp(phones.find((x) => x.id === Number(6)).cost
                )} ${val1})
${message.user.misc.phone === 7 ? "✔️" : "✖️"} 7. iPhone 11 Pro Max 
(${utils.sp(phones.find((x) => x.id === Number(7)).cost
                )} ${val1})
${message.user.misc.phone === 8 ? "✔️" : "✖️"} 8. Xiaomi Mi Mix Alpha 
(${utils.sp(phones.find((x) => x.id === Number(8)).cost
                )} ${val1})
${message.user.misc.phone === 9 ? "✔️" : "✖️"} 9. Samsung Galaxy S50+ 
(${utils.sp(phones.find((x) => x.id === Number(9)).cost
                )} ${val1})
                    
🛒 Для покупки введите «Телефоны [номер]»`);
                    
                                const sell = phones.find((x) => x.id === Number(message.args[1]));
                    
                                if (!sell) return;
                    
                                if (message.user.misc.phone)
                                    return bot(
                                        `у Вас уже есть телефон «${phones[message.user.misc.phone - 1].name
                                        }» ❌\nЧтобы его продать, введите «Продать телефон»`, {
                                            keyboard: JSON.stringify({
                                                "inline": true,
                                                "buttons": [
                                                    [{
                                                        "action": {
                                                            "type": "text",
                                                            payload: JSON.stringify({command: `продать телефон`}),
                                                            "label": `💸 Продать телефон`
                                                        },
                                                        "color": "positive"
                                                    }]
                                                ]
                                            })
                                        }
                                    );
                    
                                if (message.user.balance < sell.cost)
                                    return bot(
                                        `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                                            message.user.balance
                                        )} ${val1} 💵`
                                    );
                                else if (message.user.balance >= sell.cost) {
                                    message.user.balance -= sell.cost;
                    
                                    message.user.misc.phone = sell.id;
                    
                                    message.user.procent.phone = utils.random(50, 100);
                    
                                    return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1}`);
                                }
                            }
                        }
                    );
                    
                    
                    
                    //кнопка
                    
cmd.hear(/^(?:компьютер|🖥 Компьютеры|компьютеры)\s?([0-9]+)?$/i,async (message, bot) => {
                            if (!message.isChat || message.chat.type === 1) {
                                if (!message.args[1])
                                    return bot(`компьютеры:
                    
${message.user.misc.computer === 1 ? "✔️" : "✖️"} 1. DЕXР Аquilоn О175 
(${utils.sp(computers.find((x) => x.id === Number(1)).cost
                    )} ${val1})
${message.user.misc.computer === 2 ? "✔️" : "✖️"} 2. HYРЕRРС NЕО 
(${utils.sp(computers.find((x) => x.id === Number(2)).cost
                    )} ${val1})
${message.user.misc.computer === 3 ? "✔️" : "✖️"} 3. DЕLL Аliеnwаrе Аurоrа R7 
(${utils.sp(computers.find((x) => x.id === Number(3)).cost
                    )} ${val1})
${message.user.misc.computer === 4 ? "✔️" : "✖️"} 4. HYРЕRРС СОSMОS X 3 
(${utils.sp(computers.find((x) => x.id === Number(4)).cost
                    )} ${val1})
${message.user.misc.computer === 5 ? "✔️" : "✖️"} 5. HYРЕRРС РRЕMIUM 
(${utils.sp(computers.find((x) => x.id === Number(5)).cost
                    )} ${val1})
                    
🛒 Для покупки введите «Компьютер [номер]»`);
                    
                                const sell = computers.find((x) => x.id === Number(message.args[1]));
                    
                                if (!sell) return;
                    
                                if (message.user.misc.computer)
                                    return bot(
                                        `у Вас уже есть компьютер «${computers[message.user.misc.computer - 1].name
                                        }» ❌\nЧтобы его продать, введите «Продать компьютер»`, {
                                            keyboard: JSON.stringify({
                                                "inline": true,
                                                "buttons": [
                                                    [{
                                                        "action": {
                                                            "type": "text",
                                                            payload: JSON.stringify({command: `продать компьютер`}),
                                                            "label": `💸 Продать компьютер`
                                                        },
                                                        "color": "positive"
                                                    }]
                                                ]
                                            })
                                        }
                                    );
                    
                                if (message.user.balance < sell.cost)
                                    return bot(
                                        `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                                            message.user.balance
                                        )} ${val1} 💵`
                                    );
                                else if (message.user.balance >= sell.cost) {
                                    message.user.balance -= sell.cost;
                    
                                    message.user.misc.computer = sell.id;
                    
                                    return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1}`);
                                }
                            }
                        }
                    );
                    
cmd.hear(/^(?:Инструменты|🔧Инструменты|🔧 Инструменты)\s?([0-9]+)?$/i,async (message, bot) => {
                            if (!message.isChat || message.chat.type === 1) {
                                if (!message.args[1])
                                    return bot(`Инструменты:
                    
${message.user.minertool === 1 ? "✔️" : "✖️"} 1. Деревянная кирка 
(${utils.sp(minertool.find((x) => x.id === Number(1)).cost
                    )} ${val1})
${message.user.minertool === 2 ? "✔️" : "✖️"} 2. Стальная кирка 
(${utils.sp(minertool.find((x) => x.id === Number(2)).cost
                    )} ${val1})
${message.user.minertool === 3 ? "✔️" : "✖️"} 3. Буровая установка 
(${utils.sp(minertool.find((x) => x.id === Number(3)).cost
                    )} ${val1})
${message.user.minertool === 4 ? "✔️" : "✖️"} 4. Адронный коллайдер 
(${utils.sp(minertool.find((x) => x.id === Number(4)).cost
                    )} ${val1})
${message.user.minertool === 5 ? "✔️" : "✖️"} 5. Разрушитель частиц 
(${utils.sp(minertool.find((x) => x.id === Number(5)).cost
                    )} ${val1})
                    
🛒 Для покупки введите «Инструменты [номер]»`);
                    
                                const sell = minertool.find((x) => x.id === Number(message.args[1]));
                    
                                if (!sell) return;
                    
                                if (message.user.minertool)
                                    return bot(
                                        `у Вас уже есть «${minertool[message.user.minertool - 1].name
                                        }» ❌\n Чтобы его продать, введите «Продать инструмент»`, {
                                            keyboard: JSON.stringify({
                                                "inline": true,
                                                "buttons": [
                                                    [{
                                                        "action": {
                                                            "type": "text",
                                                            payload: JSON.stringify({command: `продать инструмент`}),
                                                            "label": `💸 Продать инструмент`
                                                        },
                                                        "color": "positive"
                                                    }]
                                                ]
                                            })
                                        }
                                    );
                    
                                if (message.user.balance < sell.cost)
                                    return bot(
                                        `у Вас недостаточно денег! ❌\n\n💰 Ваш баланс: ${utils.sp(
                                            message.user.balance
                                        )} ${val1} 💵`
                                    );
                                else if (message.user.balance >= sell.cost) {
                                    message.user.balance -= sell.cost;
                    
                                    message.user.minertool = sell.id;
                    
                                    return bot(`вы купили «${sell.name}» за ${utils.sp(sell.cost)} ${val1}`);
                                }
                            }
                        }
                    );
                    
                    
                    
                    module.exports = commands;