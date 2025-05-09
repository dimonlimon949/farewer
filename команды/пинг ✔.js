
const commands=[]

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

cmd.hear(/^(?:пинг)$/i, async (message, bot) => {
    const startTime = Date.now(); // Текущее время перед отправкой сообщения

    // Отправляем сообщение пользователю
    await bot("");

    const responseTime = Date.now(); // Время после отправки сообщения

    // Вычисляем общее время выполнения команды в миллисекундах
    const totalTime = responseTime - startTime;

    // Формируем ответ с временем выполнения
    const pingMessage = `Пинг: ${totalTime} мс`;

    // Отправляем ответ пользователю
    await message.send(pingMessage);
});

module.exports = commands;