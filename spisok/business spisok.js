const utils = require('../utils.js'); 

const businesses = [
[
  // 🥤 Ларек с лимонадом - ID 1
  {
    name: "Ларек с лимонадом",
    photo: "",
    cost: 50000,
    earn: 100,
    workers: 1,
    id: 1,
    icon: "🥤",
  },
  // Улучшения для ларька с лимонадом
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `Улучшение ${i + 1}/20 (Лимонад)`,
    photo: "", // Добавьте URL фотографии, если есть
    cost: 20000 + i * 10000, // Пример увеличения цены
    earn: Math.round(100 + i * (4900 / 19)), // Увеличиваем прибыль, округляем результат
    workers: 1 + i,
    id: 1
  }))
],
[
  // 🍔 Маленькая закусочная - ID 2
  {
    name: "Маленькая закусочная",
    photo: "",
    cost: 200000,
    earn: 200,
    workers: 1,
    id: 2,
    icon: "🍔",
  },
  // Улучшения для закусочной
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `Улучшение ${i + 1}/20 (Закусочная)`,
    photo: "",
    cost: 80000 + i * 5000,
    earn: Math.round(200 + i * (9800 / 19)), // Увеличиваем прибыль, округляем результат
    workers: 1 + i * 2,
    id: 2
  }))
],
 [
  // 🍕 Пиццерия на колесах - ID 3
  {
    name: "Пиццерия на колесах",
    photo: "",
    cost: 1000000,
    earn: 300,
    workers: 1,
    id: 3,
    icon: "🍕",
  },
  // Улучшения для пиццерии
  ...Array.from({ length: 20 }, (_, i) => ({
    name: `Улучшение ${i + 1}/20 (Пиццерия)`,
    photo: "",
    cost: 400000 + i * 10000,
    earn: Math.round(300 + i * (14700 / 19)), // Увеличиваем прибыль, округляем
    workers: 1 + i * 5,
    id: 3
  }))
],
/*  [ // 🚚 Автомойка - ID 4
    {
      name: "Автомойка",
      photo: "",
      cost: 750000, // 750.000 GB
      earn: 30000, // 30.000 GB/час
      workers: 1,
      id: 4,
      icon: "🚚",
    },
    { // Улучшение 1
      name: "Новая химия",
      cost: 1125000, // 1.125.000 GB
      earn: 50000, // 50.000 GB/час
      workers: 30,
      id: 4
    },
    { // Улучшение 2
      name: "Самообслуживание",
      cost: 1800000, // 1.800.000 GB
      earn: 80000, // 80.000 GB/час
      workers: 45,
      id: 4
    },
    { // Улучшение 3
      name: "Автоматизация",
      cost: 2500000, // 2.500.000 GB
      earn: 120000, // 120.000 GB/час
      workers: 70,
      id: 4
    }
  ],
  [ // 🎣 Рыболовный магазин - ID 5
    {
      name: "Рыболовный магазин",
      photo: "",
      cost: 1750000, // 1.750.000 GB
      earn: 75000, // 75.000 GB/час
      workers: 1,
      id: 5,
      icon: "🎣",
    },
    { // Улучшение 1
      name: "Расширение ассортимента",
      cost: 2625000, // 2.625.000 GB
      earn: 120000, // 120.000 GB/час
      workers: 50,
      id: 5
    },
    { // Улучшение 2
      name: "Улучшенная реклама",
      cost: 4000000, // 4.000.000 GB
      earn: 200000, // 200.000 GB/час
      workers: 75,
      id: 5
    },
    { // Улучшение 3
      name: "Элитные снасти",
      cost: 6000000, // 6.000.000 GB
      earn: 300000, // 300.000 GB/час
      workers: 100,
      id: 5
    }
  ],
  [ // 🔧 Автомастерская - ID 6
    {
      name: "Автомастерская",
      photo: "",
      cost: 4000000, // 4.000.000 GB
      earn: 175000, // 175.000 GB/час
      workers: 1,
      id: 6,
      icon: "🔧",
    },
    { // Улучшение 1
      name: "Новое оборудование",
      cost: 6000000, // 6.000.000 GB
      earn: 300000, // 300.000 GB/час
      workers: 70,
      id: 6
    },
    { // Улучшение 2
      name: "Больше механиков",
      cost: 9000000, // 9.000.000 GB
      earn: 500000, // 500.000 GB/час
      workers: 90,
      id: 6
    },
    { // Улучшение 3
      name: "Склад запчастей",
      cost: 12500000, // 12.500.000 GB
      earn: 800000, // 800.000 GB/час
      workers: 120,
      id: 6
    }
  ],
  [ // 🛒 Супермаркет у дома - ID 7
    {
      name: "Супермаркет у дома",
      photo: "",
      cost: 8000000, // 8.000.000 GB
      earn: 400000, // 400.000 GB/час
      workers: 1,
      id: 7,
      icon: "🛒",
    },
    { // Улучшение 1
      name: "Новые отделы",
      cost: 12000000, // 12.000.000 GB
      earn: 650000, // 650.000 GB/час
      workers: 90,
      id: 7
    },
    { // Улучшение 2
      name: "Собственная выпечка",
      cost: 18000000, // 18.000.000 GB
      earn: 1000000, // 1.000.000 GB/час
      workers: 120,
      id: 7
    },
    { // Улучшение 3
      name: "Доставка на дом",
      cost: 25000000, // 25.000.000 GB
      earn: 1500000, // 1.500.000 GB/час
      workers: 150,
      id: 7
    }
  ],
  [ // 🏦 Небольшой банк - ID 8
    {
      name: "Небольшой банк",
      photo: "",
      cost: 15000000, // 15.000.000 GB
      earn: 750000, // 750.000 GB/час
      workers: 1,
      id: 8,
      icon: "🏦",
    },
    { // Улучшение 1
      name: "Больше банкоматов",
      cost: 22500000, // 22.500.000 GB
      earn: 1200000, // 1.200.000 GB/час
      workers: 100,
      id: 8
    },
    { // Улучшение 2
      name: "Онлайн-сервисы",
      cost: 30000000, // 30.000.000 GB
      earn: 2000000, // 2.000.000 GB/час
      workers: 140,
      id: 8
    },
    { // Улучшение 3
      name: "Привлечение инвесторов",
      cost: 40000000, // 40.000.000 GB
      earn: 3000000, // 3.000.000 GB/час
      workers: 180,
      id: 8
    }
  ]; */
]

module.exports = businesses;
