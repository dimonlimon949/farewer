const utils = require('../utils.js');

const apartments = [
    {
        name: "Чердак",
        cost: utils.numstring("700.000.000"),
        id: 1,
    },
    {
        name: "Квартира в общежитии",
        cost: utils.numstring("1.000.000.000"),
        id: 2,
    },
    {
        name: "Однокомнатная квартира",
        cost: utils.numstring("1.500.000.000"),
        id: 3,
    },
    {
        name: "Двухкомнатная квартира",
        cost: utils.numstring("3.000.000.000"),
        id: 4,
    },
    {
        name: "Четырехкомнатная квартира",
        cost: utils.numstring("6.000.000.000"),
        id: 5,
    },
    {
        name: "Квартира в центре Москвы",
        cost: utils.numstring("12.000.000.000"),
        id: 6,
    },
    {
        name: "Двухуровневая квартира",
        cost: utils.numstring("24.000.000.000"),
        id: 7,
    },
    {
        name: "Квартира с Евроремонтом",
        cost: utils.numstring("50.000.000.000"),
        id: 8,
    },
    {
        name: "Элитная квартира",
        cost: utils.numstring("100.000.000.000"),
        id: 9,
    },
];

module.exports = apartments;
