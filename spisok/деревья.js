const utils = require('../utils.js');

const trees = [
    {
        name: "Одинокое дерево",

        cost: utils.numstring("1.000.000.000"),

        photo: `photo-197579361_457242931`,

        earn: 1,

        id: 1,
    },

    {
        name: "Несколько деревьев",

        cost: utils.numstring("10.000.000.000"),

        photo: `photo-197579361_457242933`,

        earn: 3,

        id: 2,
    },

    {
        name: "Лес",

        cost: utils.numstring("100.000.000.000"),

        photo: `photo-197579361_457242932`,

        earn: 5,

        id: 3,
    },

    {
        name: "Опавшее дерево",

        cost: utils.numstring("1.500.000.000"),

        photo: `photo-197579361_457242934`,

        earn: 9,

        id: 4,
    },

    {
        name: "Березка",

        cost: utils.numstring("1.500.000.000"),

        photo: `photo-211261524_457380226`,

        earn: 15,

        id: 5,
    },
];

module.exports = trees;
