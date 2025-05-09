const { VK } = require('vk-io');
const { readFileSync } = require('fs');

const tokensFilePath = './настройки/токены.json';


function getToken() {
  try {
    const tokens = JSON.parse(readFileSync(tokensFilePath, 'utf8'));
    return tokens; // Возвращаем все данные из файла
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null; // Возвращаем null в случае ошибки
  }
}

const tokenData = getToken();

const vk = new VK({
  token: tokenData.token,
  apiMode: 'parallel',
});

module.exports = vk; // Экспортируем экземпляр VK

