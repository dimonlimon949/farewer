const utils = require('../utils.js');

const businesses2 = [
    [ // Пляжный киоск (1)
        {
            name: "Пляжный киоск",
            photo: "",
            cost: utils.numstring("15.000.000"), 
            earn: utils.numstring("350.000"), 
            workers: 1, 
            id: 1,
            icon: "🏖️",
        },
        { // Улучшение 1
            name: "Расширение ассортимента",
            cost: utils.numstring("3.000.000"), 
            earn: utils.numstring("437.500"), 
            workers: 10, // Увеличение количества рабочих
            id: 1,
            icon: "🏖️",
        },
        { // Улучшение 2
            name: "Новые коктейли",
            cost: utils.numstring("7.500.000"), 
            earn: utils.numstring("765.625"), 
            workers: 20,
            id: 1,
            icon: "🏖️",
        },
        { // Улучшение 3
            name: "Открытие зоны отдыха",
            cost: utils.numstring("15.000.000"), 
            earn: utils.numstring("2.296.875"), 
            workers: 35,
            id: 1,
            icon: "🏖️",
        }
    ],
    [ // Тележка с мороженым (2)
        {
            name: "Тележка с мороженым",
            photo: "",
            cost: utils.numstring("50.000.000"), 
            earn: utils.numstring("1.100.000"), 
            workers: 1,
            id: 2,
            icon: "🍦",
        },
        { // Улучшение 1
            name: "Увеличение ассортимента",
            photo: "",
            cost: utils.numstring("10.000.000"), 
            earn: utils.numstring("1.375.000"), 
            workers: 15,
            id: 2,
            icon: "🍦",
        },
        { // Улучшение 2
            name: "Новые вкусы",
            photo: "",
            cost: utils.numstring("25.000.000"), 
            earn: utils.numstring("2.406.250"), 
            workers: 30,
            id: 2,
            icon: "🍦",
        },
        { // Улучшение 3
            name: "Собственная точка",
            photo: "",
            cost: utils.numstring("50.000.000"), 
            earn: utils.numstring("7.218.750"), 
            workers: 50,
            id: 2,
            icon: "🍦",
        }
    ],
    [ // Ларек с лимонадом (3)
        {
            name: "Ларек с лимонадом",
            photo: "",
            cost: utils.numstring("150.000.000"), 
            earn: utils.numstring("3.200.000"), 
            workers: 1,
            id: 3,
            icon: "🥤",
        },
        { // Улучшение 1
            name: "Расширение меню",
            photo: "",
            cost: utils.numstring("30.000.000"), 
            earn: utils.numstring("4.000.000"), 
            workers: 20,
            id: 3,
            icon: "🥤",
        },
        { // Улучшение 2
            name: "Новые рецепты",
            photo: "",
            cost: utils.numstring("75.000.000"), 
            earn: utils.numstring("7.000.000"), 
            workers: 40,
            id: 3,
            icon: "🥤",
        },
        { // Улучшение 3
            name: "Место для отдыха",
            photo: "",
            cost: utils.numstring("150.000.000"), 
            earn: utils.numstring("21.000.000"), 
            workers: 60,
            id: 3,
            icon: "🥤",
        }
    ],
    [ // Маленькая закусочная (4)
        {
            name: "Маленькая закусочная",
            photo: "",
            cost: utils.numstring("450.000.000"), 
            earn: utils.numstring("9.500.000"), 
            workers: 1,
            id: 4,
            icon: "🍔",
        },
        { // Улучшение 1
            name: "Расширение меню",
            photo: "",
            cost: utils.numstring("90.000.000"), 
            earn: utils.numstring("11.875.000"), 
            workers: 30,
            id: 4,
            icon: "🍔",
        },
        { // Улучшение 2
            name: "Доставка",
            photo: "",
            cost: utils.numstring("225.000.000"), 
            earn: utils.numstring("20.781.250"), 
            workers: 50,
            id: 4,
            icon: "🍔",
        },
        { // Улучшение 3
            name: "Новое оборудование",
            photo: "",
            cost: utils.numstring("450.000.000"), 
            earn: utils.numstring("62.343.750"), 
            workers: 75,
            id: 4,
            icon: "🍔",
        }
    ],
    [ // Пиццерия на колесах (5)
        {
            name: "Пиццерия на колесах",
            photo: "",
            cost: utils.numstring("1.350.000.000"), 
            earn: utils.numstring("27.500.000"), 
            workers: 1,
            id: 5,
            icon: "🍕",
        },
        { // Улучшение 1
            name: "Увеличение ассортимента",
            photo: "",
            cost: utils.numstring("270.000.000"), 
            earn: utils.numstring("34.375.000"), 
            workers: 40,
            id: 5,
            icon: "🍕",
        },
        { // Улучшение 2
            name: "Расширение маршрута",
            photo: "",
            cost: utils.numstring("675.000.000"), 
            earn: utils.numstring("60.156.250"), 
            workers: 60,
            id: 5,
            icon: "🍕",
        },
        { // Улучшение 3
            name: "Новая печь",
            photo: "",
            cost: utils.numstring("1.350.000.000"), 
            earn: utils.numstring("180.468.750"), 
            workers: 80,
            id: 5,
            icon: "🍕",
        }
    ],
    [ // Кинотеатр под открытым небом (6)
        {
            name: "Кинотеатр под открытым небом",
            photo: "",
            cost: utils.numstring("4.000.000.000"), 
            earn: utils.numstring("81.000.000"), 
            workers: 1,
            id: 6,
            icon: "🎬",
        },
        { // Улучшение 1
            name: "Новые экраны",
            photo: "",
            cost: utils.numstring("800.000.000"), 
            earn: utils.numstring("101.250.000"), 
            workers: 50,
            id: 6,
            icon: "🎬",
        },
        { // Улучшение 2
            name: "Более широкий экран",
            photo: "",
            cost: utils.numstring("2.000.000.000"), 
            earn: utils.numstring("177.187.500"), 
            workers: 80,
            id: 6,
            icon: "🎬",
        },
        { // Улучшение 3
            name: "Открытие второго зала",
            photo: "",
            cost: utils.numstring("4.000.000.000"), 
            earn: utils.numstring("531.562.500"), 
            workers: 100,
            id: 6,
            icon: "🎬",
        }
    ],
    [ // Небольшая заправка (7)
        {
            name: "Небольшая заправка",
            photo: "",
            cost: utils.numstring("7.000.000.000"), 
            earn: utils.numstring("141.000.000"), 
            workers: 1,
            id: 7,
            icon: "⛽",
        },
        { // Улучшение 1
            name: "Более качественное топливо",
            photo: "",
            cost: utils.numstring("1.400.000.000"), 
            earn: utils.numstring("176.250.000"), 
            workers: 75,
            id: 7,
            icon: "⛽",
        },
        { // Улучшение 2
            name: "Новый магазин",
            photo: "",
            cost: utils.numstring("3.500.000.000"), 
            earn: utils.numstring("308.437.500"), 
            workers: 100,
            id: 7,
            icon: "⛽",
        },
        { // Улучшение 3
            name: "Более современное оборудование",
            photo: "",
            cost: utils.numstring("7.000.000.000"), 
            earn: utils.numstring("925.312.500"), 
            workers: 150,
            id: 7,
            icon: "⛽",
            criticalChance: 10 // Шанс крит. дохода 10%
        }
    ],
    [ // Аркадный зал (8)
        {
            name: "Аркадный зал",
            photo: "",
            cost: utils.numstring("10.000.000.000"), 
            earn: utils.numstring("201.000.000"), 
            workers: 1,
            id: 8,
            icon: "🎯",
        },
        { // Улучшение 1
            name: "Больше автоматов",
            photo: "",
            cost: utils.numstring("2.000.000.000"), 
            earn: utils.numstring("251.250.000"), 
            workers: 90,
            id: 8,
            icon: "🎯",
        },
        { // Улучшение 2
            name: "Новые игры",
            photo: "",
            cost: utils.numstring("5.000.000.000"), 
            earn: utils.numstring("439.687.500"), 
            workers: 120,
            id: 8,
            icon: "🎯",
        },
        { // Улучшение 3
            name: "Кафе",
            photo: "",
            cost: utils.numstring("10.000.000.000"), 
            earn: utils.numstring("1.319.062.500"), 
            workers: 160,
            id: 8,
            icon: "🎯",
            maintenanceReduction: 20 // Снижение затрат на обслуживание на 20%
        }
    ],
    [ // Боулинг-клуб (9)
        {
            name: "Боулинг-клуб",
            photo: "",
            cost: utils.numstring("13.000.000.000"), 
            earn: utils.numstring("261.000.000"), 
            workers: 1,
            id: 9,
            icon: "🎳",
        },
        { // Улучшение 1
            name: "Ремонт дорожек",
            photo: "",
            cost: utils.numstring("2.600.000.000"), 
            earn: utils.numstring("326.250.000"), 
            workers: 110,
            id: 9,
            icon: "🎳",
        },
        { // Улучшение 2
            name: "Новое оборудование",
            photo: "",
            cost: utils.numstring("6.500.000.000"), 
            earn: utils.numstring("570.937.500"), 
            workers: 140,
            id: 9,
            icon: "🎳",
        },
        { // Улучшение 3
            name: "Больше дорожек",
            photo: "",
            cost: utils.numstring("13.000.000.000"), 
            earn: utils.numstring("1.712.812.500"), 
            workers: 200,
            id: 9,
            icon: "🎳",
            maxWorkersIncrease: 2 //  Увеличение максимального количества рабочих на 2
        }
    ],
    [ // Караоке-бар (10)
        {
            name: "Караоке-бар",
            photo: "",
            cost: utils.numstring("15.000.000.000"), 
            earn: utils.numstring("301.000.000"), 
            workers: 1,
            id: 10,
            icon: "🎤",
        },
        { // Улучшение 1
            name: "Обновление оборудования",
            photo: "",
            cost: utils.numstring("3.000.000.000"), 
            earn: utils.numstring("376.250.000"), 
            workers: 130,
            id: 10,
            icon: "🎤",
        },
        { // Улучшение 2
            name: "Расширение меню напитков",
            photo: "",
            cost: utils.numstring("7.500.000.000"), 
            earn: utils.numstring("658.437.500"), 
            workers: 160,
            id: 10,
            icon: "🎤",
        },
        { // Улучшение 3
            name: "Дополнительные залы",
            photo: "",
            cost: utils.numstring("15.000.000.000"), 
            earn: utils.numstring("1.975.312.500"), 
            workers: 200,
            id: 10,
            icon: "🎤",
            criticalChance: 15 // Шанс крит. дохода 15%
        }
    ],
    [ // Ночной клуб (11)
        {
            name: "Ночной клуб",
            photo: "",
            cost: utils.numstring("20.000.000.000"), 
            earn: utils.numstring("420.000.000"), 
            workers: 1,
            id: 11,
            icon: "🌃",
        },
        { // Улучшение 1
            name: "Обновление оборудования",
            photo: "",
            cost: utils.numstring("4.000.000.000"), 
            earn: utils.numstring("525.000.000"), 
            workers: 170,
            id: 11,
            icon: "🌃",
        },
        { // Улучшение 2
            name: "Новые тематические вечеринки",
            photo: "",
            cost: utils.numstring("10.000.000.000"), 
            earn: utils.numstring("918.750.000"), 
            workers: 200,
            id: 11,
            icon: "🌃",
        },
        { // Улучшение 3
            name: "Больше места",
            photo: "",
            cost: utils.numstring("20.000.000.000"), 
            earn: utils.numstring("2.756.250.000"), 
            workers: 240,
            id: 11,
            icon: "🌃",
            maintenanceReduction: 25 // Снижение затрат на обслуживание на 25%
        }
    ],
    [ // Казино (12)
        {
            name: "Казино",
            photo: "",
            cost: utils.numstring("25.000.000.000"), 
            earn: utils.numstring("520.000.000"), 
            workers: 1,
            id: 12,
            icon: "🎰",
        },
        { // Улучшение 1
            name: "Больше игровых автоматов",
            photo: "",
            cost: utils.numstring("5.000.000.000"), 
            earn: utils.numstring("650.000.000"), 
            workers: 200,
            id: 12,
            icon: "🎰",
        },
        { // Улучшение 2
            name: "Новые игры",
            photo: "",
            cost: utils.numstring("12.500.000.000"), 
            earn: utils.numstring("1.137.500.000"), 
            workers: 220,
            id: 12,
            icon: "🎰",
        },
        { // Улучшение 3
            name: "VIP-зал",
            photo: "",
            cost: utils.numstring("25.000.000.000"), 
            earn: utils.numstring("3.412.500.000"), 
            workers: 250,
            id: 12,
            icon: "🎰",
            maxWorkersIncrease: 2 //  Увеличение максимального количества рабочих на 2
        }
    ],
    [ // Сеть отелей (13)
        {
            name: "Сеть отелей",
            photo: "",
            cost: utils.numstring("30.000.000.000"), 
            earn: utils.numstring("620.000.000"), 
            workers: 1,
            id: 13,
            icon: "🏨",
        },
        { // Улучшение 1
            name: "Больше комфорта",
            photo: "",
            cost: utils.numstring("6.000.000.000"), 
            earn: utils.numstring("775.000.000"), 
            workers: 180,
            id: 13,
            icon: "🏨",
        },
        { // Улучшение 2
            name: "Новые направления",
            photo: "",
            cost: utils.numstring("15.000.000.000"), 
            earn: utils.numstring("1.356.250.000"), 
            workers: 200,
            id: 13,
            icon: "🏨",
        },
        { // Улучшение 3
            name: "Улучшение сервиса",
            photo: "",
            cost: utils.numstring("30.000.000.000"), 
            earn: utils.numstring("4.068.750.000"), 
            workers: 220,
            id: 13,
            icon: "🏨",
        }
    ],

    [
        {
            name: "Заброшенная пещера",

            photo: "photo-211261524_457239207",

            cost: utils.numstring("1000000000"), 

            earn: utils.numstring("10000000"), 

            workers: 10000,

            id: 14,

            icon: "🦇",
        },

        {
            name: "Запретная зона",

            photo: "",

            cost: utils.numstring("2000000000"), 
            
            earn: utils.numstring("20000000"), 

            workers: 10000,

            id: 14,

            icon: "⛔",
        },

        {
            name: "Бездна",

            photo: "",

            cost: utils.numstring("3000000000"), 
            
            earn: utils.numstring("30000000"), 

            workers: 10000,

            id: 14,

            icon: "🕳",
        },

        {
            name: "Преисподняя",

            photo: "",

            cost: utils.numstring("5000000000"), 
            
            earn: utils.numstring("50000000"), 

            workers: 10000,

            id: 14,

            icon: "🔥",
        },
    ],

    [
        {
            name: "Глобальный рынок",

            photo: "photo-211261524_457239207",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 10000,

            id: 15,

            icon: "🛸",
        },

        {
            name: "Метавселенная товаров",

            photo: "",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 10000,

            id: 15,

            icon: "🌌",
        },

        {
            name: "Темница",

            photo: "",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 10000,

            id: 15,

            icon: "👑",
        },
    ],

    [
        {
            name: "Киностудии по всему миру",

            cost: utils.numstring("10000000"), 
            
            earn: utils.numstring("3000000"), 

            workers: 7500,

            id: 16,

            icon: "📹",
        },

        {
            name: "Киностудии по всей галактике",

            photo: "",

            cost: utils.numstring("50000000"), 
            
            earn: utils.numstring("150000000"), 

            workers: 10000,

            id: 16,

            icon: "📹",
        },
    ],

    [
        {
            name: "Кладбище зомби",

            cost: utils.numstring("100000000"), 
            
            earn: utils.numstring("1000000"), 

            workers: 1,

            id: 17,

            icon: "☣",
        },

        {
            name: "Кладбище скелетов",

            cost: utils.numstring("150000000"), 
            
            earn: utils.numstring("5000000"), 

            workers: 1,

            id: 17,

            icon: "☣",
        },

        {
            name: "Кладбище духов",

            cost: utils.numstring("200000000"), 
            
            earn: utils.numstring("10000000"), 

            workers: 1,

            id: 17,

            icon: "☣",
        },
    ],

    [
        {
            name: "꧁༒☆•ѦƊ•☆༒꧂",

            photo: "photo-197579361_457241472",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 666666666,

            id: 18,

            icon: "☣",
        },
    ],

    [
        {
            name: "Ледяные миньоны",

            photo: "photo-197579361_457241609",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 20,

            id: 19,

            icon: "❄",
        },
    ],

    [
        {
            name: "🤯𝙹𝚜𝚙𝚏𝚘𝚘𝚕𝚑𝟷𝟿🤯",

            photo: "photo-197579361_457247553",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 5,

            id: 20,

            icon: "♻",
        },
    ],

    [
        {
            name: "Страдания людей",

            photo: "photo-197579361_457265687",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 4,

            id: 21,

            icon: "☣",
        },
    ],

    [
        {
            name: "Sex Shop",

            photo: "photo-197579361_457265686",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 5000,

            id: 22,

            icon: "☣",
        },
    ],

    [
        {
            name: "Корпорация по сборке ПК",

            photo: "photo-197579361_457265689",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 12345654321,

            id: 23,

            icon: "☣",
        },
    ],

    [
        {
            name: "Майнинг биткоинов",

            photo: "photo-197579361_457337226",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 500,

            id: 24,

            icon: "🌐",
        },
    ],

    [
        {
            name: "Сытый Ёжик",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 666,

            id: 25,

            icon: "🦔",
        },
    ],

    [
        {
            name: "Атл групп",

            photo: "photo-197579361_457342282",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 500,

            id: 26,

            icon: "🅰️",
        },
    ],

    [
        {
            name: "Личный Бизнес",

            photo: "photo",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 666,

            id: 27,

            icon: "📇",
        },
    ],

    [
        {
            name: "TikTok House",

            photo: "photo",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 666,

            id: 28,

            icon: "🏠",
        },
    ],

    [
        {
            name: "TikTok House",

            photo: "photo",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 666,

            id: 29,

            icon: "🏠",
        },
    ],

    [
        {
            name: "Космодром и полеты на Венеру",

            photo: "photo-211261524_457255183",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 40000,

            id: 30,

            icon: "🏠",
        },
    ],

    [
        {
            name: "Магазин Живого пива",

            photo: "photo-211261524_457260547",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 40000,

            id: 31,

            icon: "🏠",
        },
    ],

    [
        {
            name: "🌪ᴘᴀʀᴀᴅɪsᴇ🌪",

            photo: "photo-211261524_457260547",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 40000,

            id: 32,

            icon: "🏠",
        },
    ],

    [
        {
            name: "Личная шахта",

            photo: "photo-211261524_457279755",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 40000,

            id: 33,

            icon: "🧨",
        },
    ],

    [
        {
            name: "Аэропорт",

            photo: "",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 40000,

            id: 34,

            icon: "🧨",
        },

        {
            name: "Аэропорт",

            photo: "",

            cost: utils.numstring("0"), 
            
            earn: utils.numstring("0"), 

            workers: 40000,

            id: 34,

            icon: "🧨",
        },
    ],
];

module.exports = businesses2;
