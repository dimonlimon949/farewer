const utils = require('../utils.js');

const homes = [
    {
        name: "Деревенский домик",
        cost: utils.numstring("250.000.000"),
        id: 1,
    },
    {
        name: "Маленький домик",
        cost: utils.numstring("5.000.000.000"),
        id: 2,
    },
    {
        name: "Особняк в центре города",
        cost: utils.numstring("25.000.000.000"),
        id: 3,
    },
    {
        name: "Загородный дом",
        cost: utils.numstring("50.000.000.000"),
        id: 4,
    },
    {
        name: "Дом Тима Кука",
        cost: utils.numstring("100.000.000.000"),
        id: 5,
    },
];

module.exports = homes;
