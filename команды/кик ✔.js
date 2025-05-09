const fs = require('fs');
const { VK } = require('vk-io');
const double = require('../database/users.json')

const commands = [];
const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};

// --------- Настройки ----------
const tokensFilePath = './настройки/токены.json';
const tokensFilePath4 = './настройки/создатели бота.json';
const tokensFilePath2 = './настройки/ид бесед.json';

function getToken(filePath) {
    try {
        const tokens = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        return tokens;
    } catch (error) {
        console.error(`Ошибка при чтении файла ${filePath}:`, error);
        return null;
    }
}

const tokenData = getToken(tokensFilePath);
const tokenData4 = getToken(tokensFilePath4);
const tokenData2 = getToken(tokensFilePath2);

const spolerIds = tokenData4 ? Object.values(tokenData4)
    .map(id => Number(id))
    .filter(id => Number.isInteger(id) && id > 0) : [];

const chatlogi = tokenData2?.chatlogi;

const vk = require('../vk-api.js'); 

// --------- Система безопасности ----------

const bannedWords = [/подписывайтесь/i, /за день/i, /реклама/i, /переходи/i, /бесплатно/i];

function containsBannedContent(text) {
    if (!text) return false;
    for (const word of bannedWords) {
        if (word.test(text)) return true;
    }
    const linkRegex = /(?:https?:\/\/|www\.)[^\s]+/i;
    if (linkRegex.test(text)) return true;
    return false;
}

// --------- Вспомогательные функции ----------

async function resolveTargetId(arg) {
    // Если аргумент - число (UID)
    if (!isNaN(Number(arg))) {
        const user = double.find(u => u.uid === Number(arg) || (u.astats && u.astats.fakeid === Number(arg)));
        return user ? { vkId: user.id, uid: user.uid } : null;
    }

    // Если аргумент - ссылка ВК
    if (arg.match(/vk\.com|m\.vk\.com/i)) {
        const screenName = arg.replace(/((http|https):\/\/(vk.com|m.vk.com)\/|(vk.com)\/)/gi, "").split('/')[0];
        try {
            const resolveResponse = await vk.api.utils.resolveScreenName({ screen_name: screenName });
            if (resolveResponse && resolveResponse.type === 'user') {
                // Ищем пользователя в базе, но если не найден - все равно возвращаем VK ID
                const user = double.find(u => u.id === resolveResponse.object_id);
                return { 
                    vkId: resolveResponse.object_id,
                    uid: user ? (user.astats?.fakeid || user.uid) : null,
                    screenName: screenName
                };
            }
        } catch (error) {
            console.error("Ошибка при resolveScreenName:", error);
        }
    }

    return null;
}

async function kickUser(message, bot, target, reason = "команду администратора") {
    if (spolerIds.includes(Number(message.user.id))) {
        return message.reply("Нельзя кикать создателей!");
    }

    const targetData = await resolveTargetId(target);
    
    if (!targetData || !targetData.vkId) {
        return message.reply("Не удалось определить пользователя. Проверьте ссылку или UID.");
    }



    try {
        await vk.api.messages.removeChatUser({ 
            chat_id: message.chatId, 
            user_id: targetData.vkId 
        });

        // Формируем информативное сообщение
        let infoMessage;
        if (targetData.uid) {
            infoMessage = `💤 Игрок UID: ${targetData.uid}`;
        } else if (targetData.screenName) {
            infoMessage = `💤 Пользователь vk.com/${targetData.screenName}`;
        } else {
            infoMessage = `💤 Пользователь ID: ${targetData.vkId}`;
        }

        await message.reply(`${infoMessage} был кикнут за ${reason}.`);

        // Логирование
        vk.api.messages.send({
            chat_id: chatlogi,
            message: `⚡ Админ [id${message.user.id}|${message.user.tag}] кикнул ${infoMessage} за ${reason}.`,
            random_id: 0
        });

    } catch (e) {
        if (e.code === 935) {
            await message.reply("Пользователь не в беседе.");
        } else if (e.code === 15) {
            await message.reply("Нет доступа к чату или пользователю.");
        } else {
            console.error(e);
            await message.reply(`Ошибка при кике. Код: ${e.code}`);
        }
    }
}



// --------- Команды ----------

cmd.hear(/^(?:кик)\s+([^\s]+)(?:\s+(.+))?/i, async (message, bot) => {
    if (message.user.settings.adm < 5)
        return bot(`доступна для старших администраторов и выше`);

    const [, target, reason] = message.text.match(/^(?:кик)\s+([^\s]+)(?:\s+(.+))?/i);
    const kickReason = reason || "команду администратора";
    
    await kickUser(message, bot, target, kickReason);
});




cmd.hear(/^(?:кик)$/i, async (message, bot) => {

    if (message.chat.type !== 4) {
        const actionLog = {
            admin: {
                id: message.user.id,
                tag: message.user.tag
            },
            chatId: message.chatId,
            timestamp: new Date().toISOString(),
            action: 'kick_attempt',
            status: 'started'
        };
    
        try {
            
    
            if (message.user.bankik) {
                actionLog.status = 'rejected';
                actionLog.reason = 'admin_disabled';
                await logAction(actionLog);
                return bot(`отключено администрацией ⚠`);
            }
    
            if (!message.replyMessage) {
                actionLog.status = 'rejected';
                actionLog.reason = 'no_target';
                await logAction(actionLog);
                return message.reply(`⚠ Укажите цель для кика (ответом на сообщение)`);
            }
    
            const targetId = message.replyMessage.senderId;
            const isCommunity = targetId < 0;
            const absoluteId = Math.abs(targetId);
            actionLog.target = {
                id: targetId,
                type: isCommunity ? 'community' : 'user',
                absoluteId: absoluteId
            };
    
            // Проверка прав
            if (message.chat.type !== 4 && message.user.settings?.adm < 5) {
                actionLog.status = 'rejected';
                actionLog.reason = 'insufficient_permissions';
                await logAction(actionLog);
                return;
            }
    
            // Проверка на создателей
            if (spolerIds.includes(absoluteId)) {
                actionLog.status = 'rejected';
                actionLog.reason = 'target_is_creator';
                await logAction(actionLog);
                return message.reply(`❌ Нельзя кикать создателей!`);
            }
    
            if (isCommunity) {
                // ОСОБЫЙ СПОСОБ КИКА СООБЩЕСТВА
                actionLog.action = 'community_kick';
                await logAction(actionLog);
    
                try {
                    // 1. Получаем список участников беседы
                    const members = await vk.api.messages.getConversationMembers({
                        peer_id: message.peerId
                    });
    
                    // 2. Ищем наше сообщество среди участников
                    const communityMember = members.items.find(item => 
                        item.member_id === targetId
                    );
    
                    if (!communityMember) {
                        actionLog.status = 'failed';
                        actionLog.reason = 'community_not_in_chat';
                        await logAction(actionLog);
                        return message.reply(`❌ Это сообщество не в беседе.`);
                    }
    
                    // 3. Исключаем сообщество через специальный метод
                    await vk.api.messages.removeChatUser({
                        chat_id: message.chatId,
                        member_id: communityMember.member_id
                    });
    
                    actionLog.status = 'success';
                    await logAction(actionLog);
    
                    return message.reply(`✅ Сообщество *club${absoluteId} успешно исключено!`);
    
                } catch (e) {
                    actionLog.status = 'failed';
                    actionLog.error = {
                        code: e.code,
                        message: e.message
                    };
                    await logAction(actionLog);
    
                    console.error('Ошибка кика сообщества:', e);
                    return message.reply(`⚠ Ошибка исключения сообщества: ${e.message}`);
                }
            } else {
                // Стандартный кик пользователя
                actionLog.action = 'user_kick';
                await logAction(actionLog);
    
                try {
                    await vk.api.messages.removeChatUser({
                        chat_id: message.chatId,
                        user_id: targetId
                    });
    
                    actionLog.status = 'success';
                    await logAction(actionLog);
    
                    return message.reply(`✅ [id${targetId}|Пользователь] успешно кикнут!`);
    
                } catch (e) {
                    actionLog.status = 'failed';
                    actionLog.error = {
                        code: e.code,
                        message: e.message
                    };
                    await logAction(actionLog);
    
                    if (e.code === 935) {
                        return message.reply(`❌ Этот пользователь не в беседе.`);
                    }
                    console.error('Ошибка кика пользователя:', e);
                    return message.reply(`⚠ Ошибка кика: ${e.message}`);
                }
            }
    
        } catch (error) {
            actionLog.status = 'critical_error';
            actionLog.error = {
                message: error.message,
                stack: error.stack
            };
            await logAction(actionLog);
            console.error('Критическая ошибка в обработчике кика:', error);
            return message.reply(`⚠ Произошла критическая ошибка. Обратитесь к разработчику.`);
        }
    }

    if (message.chat.type == 4) {

        if ( message.user.settings.adm < 6) { // Проверка прав доступа
            return message.reply("исключить может только админы 6 уровня");
        }


        const actionLog = {
            admin: {
                id: message.user.id,
                tag: message.user.tag
            },
            chatId: message.chatId,
            timestamp: new Date().toISOString(),
            action: 'kick_attempt',
            status: 'started'
        };
    
        try {
            
    
            if (message.user.bankik) {
                actionLog.status = 'rejected';
                actionLog.reason = 'admin_disabled';
                await logAction(actionLog);
                return bot(`отключено администрацией ⚠`);
            }
    
            if (!message.replyMessage) {
                actionLog.status = 'rejected';
                actionLog.reason = 'no_target';
                await logAction(actionLog);
                return message.reply(`⚠ Укажите цель для кика (ответом на сообщение)`);
            }
    
            const targetId = message.replyMessage.senderId;
            const isCommunity = targetId < 0;
            const absoluteId = Math.abs(targetId);
            actionLog.target = {
                id: targetId,
                type: isCommunity ? 'community' : 'user',
                absoluteId: absoluteId
            };
    
            // Проверка прав
            if (message.chat.type !== 4 && message.user.settings?.adm < 5) {
                actionLog.status = 'rejected';
                actionLog.reason = 'insufficient_permissions';
                await logAction(actionLog);
                return;
            }
    
            // Проверка на создателей
            if (spolerIds.includes(absoluteId)) {
                actionLog.status = 'rejected';
                actionLog.reason = 'target_is_creator';
                await logAction(actionLog);
                return message.reply(`❌ Нельзя кикать создателей!`);
            }
    
            if (isCommunity) {
                // ОСОБЫЙ СПОСОБ КИКА СООБЩЕСТВА
                actionLog.action = 'community_kick';
                await logAction(actionLog);
    
                try {
                    // 1. Получаем список участников беседы
                    const members = await vk.api.messages.getConversationMembers({
                        peer_id: message.peerId
                    });
    
                    // 2. Ищем наше сообщество среди участников
                    const communityMember = members.items.find(item => 
                        item.member_id === targetId
                    );
    
                    if (!communityMember) {
                        actionLog.status = 'failed';
                        actionLog.reason = 'community_not_in_chat';
                        await logAction(actionLog);
                        return message.reply(`❌ Это сообщество не в беседе.`);
                    }
    
                    // 3. Исключаем сообщество через специальный метод
                    await vk.api.messages.removeChatUser({
                        chat_id: message.chatId,
                        member_id: communityMember.member_id
                    });
    
                    actionLog.status = 'success';
                    await logAction(actionLog);
    
                    return message.reply(`✅ Сообщество *club${absoluteId} успешно исключено!`);
    
                } catch (e) {
                    actionLog.status = 'failed';
                    actionLog.error = {
                        code: e.code,
                        message: e.message
                    };
                    await logAction(actionLog);
    
                    console.error('Ошибка кика сообщества:', e);
                    return message.reply(`⚠ Ошибка исключения сообщества: ${e.message}`);
                }
            } else {
                // Стандартный кик пользователя
                actionLog.action = 'user_kick';
                await logAction(actionLog);
    
                try {
                    await vk.api.messages.removeChatUser({
                        chat_id: message.chatId,
                        user_id: targetId
                    });
    
                    actionLog.status = 'success';
                    await logAction(actionLog);
    
                    return message.reply(`✅ [id${targetId}|Пользователь] успешно кикнут!`);
    
                } catch (e) {
                    actionLog.status = 'failed';
                    actionLog.error = {
                        code: e.code,
                        message: e.message
                    };
                    await logAction(actionLog);
    
                    if (e.code === 935) {
                        return message.reply(`❌ Этот пользователь не в беседе.`);
                    }
                    console.error('Ошибка кика пользователя:', e);
                    return message.reply(`⚠ Ошибка кика: ${e.message}`);
                }
            }
    
        } catch (error) {
            actionLog.status = 'critical_error';
            actionLog.error = {
                message: error.message,
                stack: error.stack
            };
            await logAction(actionLog);
            console.error('Критическая ошибка в обработчике кика:', error);
            return message.reply(`⚠ Произошла критическая ошибка. Обратитесь к разработчику.`);
        }
    }






});

// Улучшенная функция логирования
async function logAction(data) {
    try {
        // Переводим статусы для вывода
        const statusTranslations = {
            'started': 'начато',
            'success': 'успешно',
            'failed': 'ошибка',
            'rejected': 'отклонено',
            'critical_error': 'критическая_ошибка'
        };
        
        const translatedStatus = statusTranslations[data.status] || data.status;

        const logMessage = `🔹 ${data.action.toUpperCase()}:
👤 Админ: [id${data.admin.id}|${data.admin.tag}]
🎯 Цель: ${data.target?.type === 'community' ? '@club'+data.target.absoluteId : '@id'+data.target?.absoluteId}
📌 Чат: ${data.chatId}
🔄 Статус: ${translatedStatus}
${data.error ? `❗ Ошибка: ${data.error.message} (код ${data.error.code})` : ''}`;

        await vk.api.messages.send({
            chat_id: chatlogi,
            message: logMessage,
            random_id: 0
        });

        // Для ошибок добавляем детали
        if (data.status === 'failed' || data.status === 'critical_error') {
            await vk.api.messages.send({
                chat_id: chatlogi,
                message: `📛 Детали ошибки:\n${JSON.stringify(data.error).substring(0, 4000)}`,
                random_id: 0
            });
        }
    } catch (e) {
        console.error('Ошибка при логировании:', e);
    }
}

cmd.hear(/^(?:\/q)$/i, async (message, bot) => {
    let targetUserId = message.user.id;

    if (!targetUserId) {
        return message.reply("⚠ Не удалось определить ваш ID.");
    }

    if (spolerIds.includes(Number(targetUserId))) {
        return message.reply(`Создатели не могут покидать чат по команде /q!`);
    }
    try {
        await vk.api.messages.removeChatUser({ chat_id: message.chatId, user_id: targetUserId });
        vk.api.messages.send({
            chat_id: chatlogi,
            message: `⚡ Пользователь *id${message.user.id} самоликвидировался из беседы!`,
            random_id: 0
        });
    } catch (e) {
        if (e.code === 935) {
            await message.reply(`Вас нет в чате.`);
        } else {
            console.error(e);
            await message.reply("Произошла ошибка при выполнении команды '/q'. Обратитесь к разработчику.");
        }
    }
});

module.exports = commands;