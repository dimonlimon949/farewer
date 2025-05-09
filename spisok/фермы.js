const utils = require('../utils.js');

const farms = [
    {
        name: "7U Nvidia",
        prib: utils.numstring("1"),
        cost: utils.numstring("3.500.000"),
        id: 1,
    },
    {
        name: "AntminerS9",
        prib: utils.numstring("1.000"),
        cost: utils.numstring("3.500.000.000"),
        id: 2,
    },
    {
        name: "FM2020-BT400",
        prib: utils.numstring("1.500"),
        cost: utils.numstring("5.250.000.000"), 
        id: 3,
    },
    {
        name: "Gеnеsis Mining",
        prib: utils.numstring("2.000"),
        cost: utils.numstring("7.000.000.000"), 
        id: 4,
    },
    {
        name: "GigаWаtt",
        prib: utils.numstring("4.000"),
        cost: utils.numstring("14.000.000.000"), 
        id: 5,
    },
    {
        name: "TerraEngine",
        prib: utils.numstring("4.700"),
        cost: utils.numstring("16.450.000.000"), 
        id: 6,
    },
    {
        name: "YotaMiner",
        prib: utils.numstring("5.500"),
        cost: utils.numstring("19.250.000.000"),
        id: 7,
    },
];


module.exports = farms;
