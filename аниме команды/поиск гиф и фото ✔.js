let utils = require('../utils.js');
const axios = require('axios');
const commands = [];
const fs = require('fs');
let double = require('../database/users.json');
const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

const tokensFilePath = './настройки/токены.json';

/**
 * Читает токен из файла.
 * @returns {object|null} Объект с токенами или null в случае ошибки.
 */
function getToken() {
    try {
        const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
        return tokens;
    } catch (error) {
        console.error('[getToken] Ошибка при чтении токенов:', error);
        return null;
    }
}

/**
 * Сохраняет токен и настройки в файл.
 * @param {string} token Токен VK API.
 * @param {boolean} spoler Флаг включения спойлеров.
 * @param {boolean} chatlogi Флаг включения логирования в чате.
 */
function saveTokens(token, spoler, chatlogi) {
    const tokens = {
        token: token,
        spoler: spoler,
        chatlogi: chatlogi
    };

    try {
        fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
        console.log('[saveTokens] Токены успешно сохранены в файл.');
    } catch (error) {
        console.error('[saveTokens] Ошибка при сохранении токенов:', error);
    }
}

const tokenData = getToken();
const chatlogi = tokenData ? tokenData.chatlogi : false;
const spoler = tokenData ? tokenData.spoler : false;

const {
    VK
} = require('vk-io');
const vk = require('../vk-api.js'); 

// Объект с переводами категорий на русский
const categoryTranslations = {
    'catgirl': 'девушка-кошка',
    'foxgirl': 'девушка-лиса',
    'wolf-girl': 'девушка-волк',
    'animal-ears': 'звериные-ушки',
    'tail': 'хвост',
    'tail-with-ribbon': 'хвост-с-лентой',
    'tail-from-under-skirt': 'хвост-из-под-юбки',
    'cute': 'милый',
    'cuteness-is-justice': 'милота-это-справедливость',
    'blue-archive': 'синий-архив',
    'girly': 'девчачий',
    'young-girl': 'молодая-девушка',
    'maid': 'горничная',
    'maid-uniform': 'форма-горничной',
    'vtuber': 'втубер',
    'w-sitting': 'сидит-буквой-w',
    'lying-down': 'лежит',
    'hands-forming-a-heart': 'руки-в-форме-сердца',
    'wink': 'подмигивает',
    'valentine': 'валентинка',
    'headphones': 'наушники',
    'thigh-high-socks': 'чулки-выше-колен',
    'knee-high-socks': 'гольфы-до-колен',
    'white-tights': 'белые-колготки',
    'black-tights': 'черные-колготки',
    'heterochromia': 'гетерохромия',
    'uniform': 'форма',
    'sailor-uniform': 'матросская-форма',
    'hoodie': 'толстовка',
    'ribbon': 'лента',
    'white-hair': 'белые-волосы',
    'blue-hair': 'синие-волосы',
    'long-hair': 'длинные-волосы',
    'blonde': 'блондинка',
    'blue-eyes': 'голубые-глаза',
    'purple-eyes': 'фиолетовые-глаза'
};

// Команда для отображения списка категорий
cmd.hear(/^(?:категории|список категорий)$/i, async (message, bot) => {
    console.log(`[cmd.hear] Получен запрос на список категорий от пользователя ${message.senderId}.`);

    let categoriesList = 'Доступные категории:\n';
    for (const [english, russian] of Object.entries(categoryTranslations)) {
        categoriesList += `${russian} (${english})\n`;
    }

    console.log(`[cmd.hear] Отправлен список категорий пользователю ${message.senderId}.`);
    return bot(categoriesList);
});

/**
 * Асинхронно обрабатывает запрос на изображение.
 * @param {object} message Объект сообщения VK.
 * @param {function} bot Функция для отправки сообщений.
 */
async function handleImageRequest(message, bot) {
    const userId = message.senderId;
    console.log(`[handleImageRequest] Получен запрос на изображение от пользователя ${userId}.`);

    let category = (message.args && message.args[1]) ? message.args[1] : undefined;

    // Если категория не указана, выбираем случайную
    if (!category) {
        const availableCategories = Object.keys(categoryTranslations);
        category = availableCategories[Math.floor(Math.random() * availableCategories.length)];
        console.log(`[handleImageRequest] Категория не указана. Выбрана случайная категория: "${category}".`);
        //await bot({ text: `Категория не указана. Выбрана случайная категория: "${categoryTranslations[category]}"` });
    }


    try {
        const availableCategories = Object.keys(categoryTranslations);

        if (!availableCategories.includes(category)) {
            const russianCategory = category.toLowerCase();
            category = Object.keys(categoryTranslations).find(key => categoryTranslations[key] === russianCategory) || 'catgirl';
            console.log(`[handleImageRequest] Категория "${message.args[1]}" преобразована в "${category}".`);
        }

        if (!availableCategories.includes(category)) {
            category = 'catgirl';
            console.log(`[handleImageRequest] Категория "${message.args[1]}" не найдена. Используется категория "девушка-кошка".`);
            await bot({
                text: `Категория "${message.args[1]}" не найдена. Используется категория "девушка-кошка".`
            });
        }

        const API_ENDPOINT = `https://api.nekosia.cat/api/v1/images/${category}`;

        console.log(`[handleImageRequest] Отправляем запрос к API: ${API_ENDPOINT}`);
        const responseStartTime = performance.now();
        const response = await axios.get(API_ENDPOINT, {
            responseType: 'json',
            params: {
                count: 1,
            }
        });
        const responseEndTime = performance.now();
        console.log(`[handleImageRequest] Ответ от API: Status ${response.status}, Время: ${((responseEndTime - responseStartTime) / 1000).toFixed(2)} сек.`);

        if (response.status !== 200 || !response.data.success || !response.data.image || !response.data.image.original) {
            throw new Error(`Ошибка при получении изображения. Status: ${response.status}, Success: ${response.data.success}`);
        }

        const imageUrl = response.data.image.original.url;
        const imageExtension = response.data.image.original.extension;

        console.log(`[handleImageRequest] Загружаем изображение по URL: ${imageUrl}`);
        const imageDownloadStartTime = performance.now();
        const imageResponse = await axios.get(imageUrl, {
            responseType: 'arraybuffer',
        });
        const imageDownloadEndTime = performance.now();
        console.log(`[handleImageRequest] Изображение загружено. Время: ${((imageDownloadEndTime - imageDownloadStartTime) / 1000).toFixed(2)} сек.`);

        if (imageResponse.status !== 200) {
            throw new Error(`Ошибка при загрузке изображения: ${imageResponse.status}`);
        }

        const imageBuffer = Buffer.from(imageResponse.data, 'binary');

        console.log(`[handleImageRequest] Загружаем изображение в VK.`);
        const uploadStartTime = performance.now();
        const uploadResult = await vk.upload.messagePhoto({
            source: {
                value: imageBuffer,
                filename: `девушка.${imageExtension}`,
            }
        });
        const uploadEndTime = performance.now();
        console.log(`[handleImageRequest] Изображение загружено в VK. Время: ${((uploadEndTime - uploadStartTime) / 1000).toFixed(2)} сек, Результат:`, uploadResult);

        if (uploadResult && uploadResult.id && uploadResult.ownerId) {
            const attachmentString = `photo${uploadResult.ownerId}_${uploadResult.id}`;

            console.log(`[handleImageRequest] Отправляем изображение пользователю ${userId}.`);
            await message.send({
                attachment: attachmentString,
                keyboard: JSON.stringify({
                    "inline": true,
                    "buttons": [
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({
                                    command: `тян`
                                }),
                                "label": `👀 Хочу еще `
                            },
                            "color": "positive"
                        }],
                        [{
                            "action": {
                                "type": "text",
                                payload: JSON.stringify({
                                    command: `категории`
                                }),
                                "label": `👀 Категории аниме запросов`
                            },
                            "color": "positive"
                        }]
                    ]
                })

            });
        } else {
            console.error('[handleImageRequest] Не удалось получить информацию о загруженном фото:', uploadResult);
            await bot({
                text: 'Не удалось загрузить изображение в VK.'
            });
        }

    } catch (error) {
        console.error('[handleImageRequest] Ошибка при получении изображения тян:', error);
        if (error.response) {
            console.error('[handleImageRequest] Данные ошибки от сервера:', error.response.data);
            console.error('[handleImageRequest] Статус ошибки от сервера:', error.response.status);
        } else if (error.request) {
            console.error('[handleImageRequest] Ошибка при запросе:', error.request);
        } else {
            console.error('[handleImageRequest] Ошибка при настройке запроса:', error.message);
        }
        await bot({
            text: 'Произошла ошибка при получении изображения. Попробуйте позже.'
        });
    }
}

// Команда для получения изображения
cmd.hear(/^(?:тян|девушка|аниме)\s?(.*)?/i, async (message, bot) => {
    handleImageRequest(message, bot); // Вызываем асинхронную функцию
});

module.exports = commands;