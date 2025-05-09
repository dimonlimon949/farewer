let utils = require('../utils.js')

const fs = require('fs'); 

let clans = require("../database/clans.json");

let botinfo = require("../database/botinfo.json");

let chats = require('../database/chats.json')

let double = require('../database/users.json')

let bossinfo = require('../database/bossinfo.json')

let casino = require("../database/casino.json");

let settings = require("../database/settings.json");

let val = require("../настройки/валюты.json");

let chatss = require("../настройки/ссылки чатов.json");

let soz = require("../настройки/создатели бота.json");

async function saveval()
{
fs.writeFileSync('./настройки/валюты.json', JSON.stringify(val, null, '\t'));
return true;
}

async function savechatss()
{
fs.writeFileSync('./настройки/ссылки чатов.json', JSON.stringify(chatss, null, '\t'));
return true;
}

async function savesoz()
{
fs.writeFileSync('./настройки/создатели бота.json', JSON.stringify(soz, null, '\t'));
return true;
}

const commands = []

async function saveSettings() {
  fs.writeFileSync('./database/settings.json', JSON.stringify(settings, null, '\t'));
  return true;
}

async function upzhelezo() {
  rand = utils.random(1, 20);

  botinfo.kurszhelezo = Math.floor(Number(rand * 10000));
}

async function upzoloto() {
  rand = utils.random(1, 40);

  botinfo.kurszoloto = Math.floor(Number(rand * 10000));
}

async function upalmaz() {
  rand = utils.random(1, 80);

  botinfo.kursalmaz = Math.floor(Number(rand * 10000));
}

async function upmateria() {
  rand = utils.random(1, 110);

  botinfo.kursmateria = Math.floor(Number(rand * 10000));
}

async function upobsidian() {
  rand = utils.random(1, 120);

  botinfo.kursobsidian = Math.floor(Number(rand * 10000));
}


async function upplazma() {
  rand = utils.random(1, 150);

  botinfo.kursplazma = Math.floor(Number(rand * 10000));
}











async function kaz() {
  require("fs").writeFileSync(
    "./database/casino.json",
    JSON.stringify(casino, null, "\t")
  );
}

async function saveClan() {
require("fs").writeFileSync(
  "./database/clans.json",
  JSON.stringify(clans, null, "\t")
);
  return true;
}
  


async function saveBoss() {
  require("fs").writeFileSync(
    "./database/bossinfo.json",
    JSON.stringify(bossinfo, null, "\t")
  );

  return true;
}


async function saveAll() {
  require("fs").writeFileSync(
    "./database/botinfo.json",
    JSON.stringify(botinfo, null, "\t")
  );
  return true;
  }

async function saveC()
{
fs.writeFileSync('./database/chats.json', JSON.stringify(chats, null, '\t'));
return true;
}


function saveU() {
  let data;

  try {
    fs.writeFileSync('./database/users.json', JSON.stringify(double, null, '\t'));
  } catch (err) {
    console.error('Ошибка при записи в users.json:', err);
    return false;
  }

  try {
    data = fs.readFileSync('./database/users.json', 'utf8');
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
    return false;
  }

  const users = JSON.stringify(JSON.parse(data), null, '\t');

  // Запланировать запись в users.txt через 2500 секунд
  setTimeout(() => {
    try {
      fs.writeFileSync('./database/users.txt', users + '\n');
    } catch (err) {
      console.error('Ошибка при записи в файл:', err);
      return false;
    }
  }, 2500 * 1000); // 2500 секунд в миллисекундах

  return true;
}





setInterval(async () => {

  await saveAll();
  await saveU();
  await saveC();
  await saveBoss();
  await saveBoss()
  await saveClan()
  await kaz();
  await savesoz()
  
  await saveval()
  await savechatss()
  await saveSettings()

 console.log(`⚜Сохранил⚜`)
	}, 60000);

  setInterval(async () => {

    await upplazma();
    await upobsidian();
    await upmateria();
    await upalmaz();
    await upzoloto();
    await upzhelezo();

  
    }, 301000);


 module.exports = commands;
