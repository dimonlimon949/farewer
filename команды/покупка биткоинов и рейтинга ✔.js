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


// Пример использования
const tokenData = getToken();

const chatlogi = tokenData.chatlogi;
const spoler = tokenData.spoler;
const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js');

let btc = 'N/A';
let dog = 'N/A';
let btcAdvice = "Не удалось получить данные по BTC.";
let dogAdvice = "Не удалось получить данные по DOGE.";

let previousBtc = null;
let previousDog = null;

// История цен BTC (за последние 24 часа, каждый час)
let btcPriceHistory = [];
const btcHistoryMaxLength = 24;

// Функция форматирования чисел
function formatNumber(number) {
    return number.toLocaleString('en-US', { // Используем английский язык для точки
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });
}

// Функция форматирования DOGE
function formatDog(number) {
    return number.toFixed(3);
}

// Функция получения цены с CoinGecko
async function getCoinGeckoPrice(ids) {
    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`);
        if (!response.ok) {
            throw new Error(``)
        }
        return await response.json();
    } catch (error) {
        console.log("Ошибка при запросе к CoinGecko:", error); // Добавлено логирование
        return null;
    }
}

// **Новый код для хранения данных о курсах в файле curs.json**

const cursFilePath = './курс/curs.json';

// Функция для чтения данных о курсах из файла
function getCursData() {
    try {
        const data = JSON.parse(fs.readFileSync(cursFilePath, 'utf8'));
        return data;
    } catch (error) {
        console.error('Ошибка при чтении файла curs.json:', error);
        return {
            btc: 'N/A',
            dog: 'N/A',
            btcAdvice: "Не удалось получить данные по BTC.",
            dogAdvice: "Не удалось получить данные по DOGE."
        }; // Значения по умолчанию
    }
}

// Функция для сохранения данных о курсах в файл
function saveCursData(data) {
    try {
        // Преобразуем значения btc и dog в числа перед сохранением
        const saveData = {
            btc: typeof data.btc === 'string' ? parseFloat(data.btc.replace(/,/g, '')) : data.btc, //Парсим если строка, иначе берем как есть
            dog: typeof data.dog === 'string' ? parseFloat(data.dog) : data.dog,
            btcAdvice: data.btcAdvice,
            dogAdvice: data.dogAdvice
        };

        fs.writeFileSync(cursFilePath, JSON.stringify(saveData, null, 2), 'utf8');
        console.log('Данные о курсах успешно сохранены в curs.json.');
    } catch (error) {
        console.error('Ошибка при сохранении данных в curs.json:', error);
    }
}

// Инициализация данных о курсах из файла
let cursData = getCursData();
btc = cursData.btc;
dog = cursData.dog;
btcAdvice = cursData.btcAdvice;
dogAdvice = cursData.dogAdvice;


// Функция обновления цены и предоставления советов
async function updatePrice(coin, setter, formatter, previous, coinName, adviceSetter) {
    const data = await getCoinGeckoPrice(coin);
    if (data && data[coin] && data[coin].usd) {
        const newPrice = data[coin].usd;
        const formattedPrice = formatter(newPrice);
        setter(formattedPrice);

        let changeMessage = '';
        let advice = '';
        let difference = 0;

        if (previous !== null) {
            difference = newPrice - previous;

            if (Math.abs(difference) >= 0.0005) {
                if (difference > 0) {
                    changeMessage = `+${formatter(difference)} (Подорожал)`;
                    advice = `${coinName} подорожал!`;
                } else if (difference < 0) {
                    changeMessage = `${formatter(difference)} (Подешевел)`;
                    advice = `${coinName} подешевел!`;
                }
            } else {
                changeMessage = "Цена не изменилась";
                advice = `${coinName} стабилен.`;
            }
        } else {
            advice = `Нет данных об изменении цены на ${coinName}.`;
        }

        // Обновляем историю цен BTC
        if (coin === "bitcoin") {
            btcPriceHistory.push({
                price: newPrice,
                timestamp: Date.now()
            }); // Сохраняем цену и время
            if (btcPriceHistory.length > btcHistoryMaxLength) {
                btcPriceHistory.shift(); // Удаляем самый старый элемент
            }
        }

        console.log(`${coinName} - ${formattedPrice} ${changeMessage}`);
        adviceSetter(advice);

        // Обновляем данные в объект cursData, но **не сохраняем в файл здесь**
        if (coin === "bitcoin") {
            cursData.btc = parseFloat(formattedPrice.replace(/,/g, '')); // Удаляем запятые и преобразуем в число
            cursData.btcAdvice = advice;
        } else if (coin === "dogecoin") {
            cursData.dog = parseFloat(formattedPrice); // Предполагается, что formatDog возвращает уже число
            cursData.dogAdvice = advice;
        }

        return {
            price: formattedPrice,
            rawPrice: newPrice, // Возвращаем необработанную цену
            difference,
        };
    } else {
        const errorMessage = `Не удалось получить цену ${coinName}`;
        console.log(errorMessage);
        adviceSetter(errorMessage);
        return null;
    }
}

// Функции обновления цен BTC и DOGE
async function updateBtc() {
    return await updatePrice(
        "bitcoin",
        (price) => (btc = price),
        formatNumber,
        previousBtc,
        "BTC",
        (advice) => (btcAdvice = advice)
    );
}

async function updateDog() {
    return await updatePrice(
        "dogecoin",
        (price) => (dog = price),
        formatDog,
        previousDog,
        "DOGE",
        (advice) => (dogAdvice = advice)
    );
}

// Функция обновления цен обеих криптовалют
async function updatePrices() {
    const btcResult = await updateBtc();
    const dogResult = await updateDog();

    if (btcResult) {
        previousBtc = btcResult.rawPrice; // Сохраняем необработанную цену
    }
    if (dogResult) {
        previousDog = dogResult.rawPrice; // Сохраняем необработанную цену
    }

    // **Сохраняем в файл только после обновления обеих цен**
    saveCursData(cursData);
}

// Запускаем обновление цен каждые 30 секунд
setInterval(updatePrices, 60000);
updatePrices();

// Функция для расчета изменения цены за период
function calculatePriceChange(history, periodInHours) {
    const now = Date.now();
    const cutoff = now - periodInHours * 60 * 60 * 1000; // Период в миллисекундах

    // Фильтруем историю, оставляя только записи за нужный период
    const recentHistory = history.filter(item => item.timestamp >= cutoff);

    if (recentHistory.length < 2) {
        return "Недостаточно данных";
    }

    const firstPrice = recentHistory[0].price; // Самая старая цена в периоде
    const lastPrice = recentHistory[recentHistory.length - 1].price; // Самая новая цена в периоде
    const change = lastPrice - firstPrice;

    return change > 0 ? `+${formatNumber(change)}` : formatNumber(change);
}



cmd.hear(/^(?:курс|📈 Курс)$/i, (message, bot) => {
    const btcChange1h = calculatePriceChange(btcPriceHistory, 1);
    const btcChange24h = calculatePriceChange(btcPriceHistory, 24);

    let btcInfo = `
₿ BTC: ${btc}
💡 - ${btcAdvice}
📈 Изменение за час: ${btcChange1h} $
📉 Изменение за 24 часа: ${btcChange24h} $
`;

    let dogInfo = `
🐶 DOGE: ${dog}
💡 - ${dogAdvice}
`;

    return bot(btcInfo + dogInfo, { // Добавляем объект keyboard
        keyboard: JSON.stringify({
            inline: true,
            buttons: [
                [{
                    action: {
                        type: "text",
                        payload: JSON.stringify({
                            command: `история`
                        }), // Важно сериализовать payload
                        label: `📈 История BTC`, // Новый текст кнопки с иконкой
                    },
                    color: "primary",
                }, ],
            ],
        }),
    });
});

cmd.hear(/^(?:история)$/i, (message, bot) => {
    if (btcPriceHistory.length === 0) {
        return bot("История цен BTC пуста.");
    }

    const historyLength = btcPriceHistory.length;
    const startIndex = Math.max(0, historyLength - 10); // Показывать последние 10

    let historyText = "История цен BTC (последние 10):\n";
    for (let i = startIndex; i < historyLength; i++) {
        const item = btcPriceHistory[i];
        const date = new Date(item.timestamp);
        historyText += `${date.toLocaleTimeString()}: ${formatNumber(item.price)}\n`;
    }

    return bot(historyText);
});


cmd.hear(/^(?:рейтинг)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {
        message.args[1] = message.args[1].replace(/([.,])/gi, "");
        message.args[1] = message.args[1].replace(/([кk])/gi, "000");
        message.args[1] = message.args[1].replace(/[мm]/gi, "000000");

        if (message.user.inf === true) return bot(`Выключите безлимитный баланс`);

        if (!Number(message.args[1])) return bot("Введите корректное число.");

        message.args[1] = Math.floor(Number(message.args[1]));

        if (message.args[1] <= 0) return bot("Введите число больше нуля.");

        const ratingCost = 1000000; // Стоимость 1 единицы рейтинга
        const maxAffordableRating = Math.floor(message.user.balance / ratingCost); // Сколько рейтинга можно купить

        if (message.args[1] > maxAffordableRating) {
            return bot(
                `У вас недостаточно денег. Вы можете купить максимум ${utils.sp(maxAffordableRating)} ед. рейтинга.`, {
                    keyboard: JSON.stringify({
                        inline: true,
                        buttons: [
                            [{
                                action: {
                                    type: "text",
                                    payload: {
                                        command: `рейтинг ${maxAffordableRating}` // Убрал utils.sp для payload
                                    },
                                    label: `Купить максимум`, // Оставил utils.sp для отображения
                                },
                                color: "primary",
                            }, ],
                        ],
                    }),
                }
            );
        } else if (message.args[1] * ratingCost > message.user.balance) {
            return bot(
                `У вас недостаточно денег. Вы можете купить максимум ${utils.sp(maxAffordableRating)} ед. рейтинга.`, {
                    keyboard: JSON.stringify({
                        inline: true,
                        buttons: [
                            [{
                                action: {
                                    type: "text",
                                    payload: {
                                        command: `рейтинг ${maxAffordableRating}` // Убрал utils.sp для payload
                                    },
                                    label: `Купить максимум`, // Оставил utils.sp для отображения
                                },
                                color: "primary",
                            }, ],
                        ],
                    }),
                }
            );
        } else if (message.args[1] * ratingCost <= message.user.balance) {
            message.user.balance -= message.args[1] * ratingCost;
            message.user.rating += message.args[1];

            return bot(
                `Вы успешно повысили свой рейтинг на ${utils.sp(message.args[1])} ед. 👑 за ${utils.sp(message.args[1] * ratingCost)}${val1}\n` +
                `💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}\n` +
                `Вы могли купить максимум ${utils.sp(maxAffordableRating)} ед. рейтинга.`
            );
        }
    }
});

cmd.hear(/^(?:биткоин)\s(.*)$/i, async (message, bot) => {
    if (!message.isChat || message.chat.type == 1) {
        message.args[1] = message.args[1].replace(/([.,])/gi, "");
        message.args[1] = message.args[1].replace(/(к|k)/gi, "000");
        message.args[1] = message.args[1].replace(/(м|m)/gi, "000000");

        // Поддержка "вабанк" и аналогов
        if (/(вабанк|вобанк|все|всё)/gi.test(message.args[1])) {
            // Используем предыдущую необработанную цену для вычисления максимума
            if (previousBtc) {
                message.args[1] = Math.floor(Number(message.user.balance / previousBtc));
            } else {
                return bot("Не удалось получить текущую цену BTC.");
            }
        } else {
            message.args[1] = Number(message.args[1]);
        }

        if (!Number(message.args[1]) && message.args[1] !== 0) return bot("Некорректное количество."); // Разрешаем 0
        message.args[1] = Math.floor(Number(message.args[1]));

        if (message.user.inf === true) return bot(`Выключите безлимитный баланс`);

        if (message.args[1] <= 0 && !/(вабанк|вобанк|все|всё)/gi.test(message.args[1])) return bot("Количество должно быть больше нуля."); // Разрешаем 0 если "вабанк"

        //Используем необработанную цену (previousBtc) для расчетов
        if (!previousBtc) {
            return bot("Не удалось получить текущую цену BTC.");
        }
        const cost = message.args[1] * previousBtc;

        if (cost > message.user.balance) {
            const maxAffordable = Math.floor(message.user.balance / previousBtc);
            return bot(
                `у Вас недостаточно денег! ❌\n` +
                `Вы можете купить максимум: ${utils.sp(maxAffordable)} BTC\n\n` +
                `💰 Ваш баланс: ${utils.sp(message.user.balance)}${val1} 💵\n` +
                `🌐 Курс биткоина: ${btc}${val1}`, {
                    keyboard: JSON.stringify({
                        inline: true,
                        buttons: [
                            [{
                                action: {
                                    type: "text",
                                    payload: {
                                        command: `биткоин ${maxAffordable}` // Убрал utils.sp, т.к. payload должен быть числом
                                    },
                                    label: `Купить максимум`, // Оставил utils.sp для отображения
                                },
                                color: "primary",
                            }, ],
                        ],
                    }),
                }
            );
        } else {
            message.user.balance -= cost;
            message.user.btc += message.args[1];

            return bot(
                `Вы купили ${utils.sp(message.args[1])} биткоинов за ${utils.sp(cost)}${val1}\n` +
                `💰 Ваш баланс: ${utils.sp(message.user.balance)} ${val1}`
            );
        }
    }
});


module.exports = commands;