let utils = require('../utils.js')

const commands = [];

const fs = require('fs');

let double = require('../database/users.json')

const cmd = {
  hear: (pattern, action) => {
    commands.push([pattern, action]);
  }
};

const tokensFilePath = './настройки/токены.json';

function getToken() {
  try {
    const tokens = JSON.parse(fs.readFileSync(tokensFilePath, 'utf8'));
    return tokens; // Возвращаем все данные из файла
  } catch (error) {
    console.error('Ошибка при чтении токенов:', error);
    return null; // Возвращаем null в случае ошибки
  }
}

// Функция для записи токена и других данных
function saveTokens(token, spoler, chatlogi) {
  const tokens = {
    token: token,
    spoler: spoler,
    chatlogi: chatlogi
  };

  try {
    fs.writeFileSync(tokensFilePath, JSON.stringify(tokens, null, 2), 'utf8');
    console.log('Токены успешно сохранены.');
  } catch (error) {
    console.error('Ошибка при сохранении токенов:', error);
  }
}

// Пример использования
const tokenData = getToken();

const chatlogi = tokenData.chatlogi; // чат для логов 
const spoler = tokenData.spoler;
const { VK } = require('vk-io');
const vk = require('../vk-api.js'); 

cmd.hear(/^(?:реф)\s([0-9]+)$/i, async (message, bot) => {
  if (!message.isChat || message.chat.type === 1) {

    let user = double.find(x => x.uid === Number(message.args[1]));

    if (user.id == message.user.id) return bot("Вы указали сами себя");

    if (!user) return bot("ID не найден");

    if (message.user.ref == true) return bot("Вы уже получили бонус за реферала")

    message.user.ref = true

    multiply = [1, 2, 3, 4];

    multiply = utils.pick(multiply)

    user.refcount += 1;

    user.fertilizer += 2;

    user.water += 2;

    if (user.refcount < 10) {
      if (multiply == 1) {
        user.c3 += 1;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ✅\n" +
                "▶ Вам начислен 1 донат-кейс за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 1: ", error);
          }
        }
      } else if (multiply == 2) {
        user.balance += 10000000;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 10.000.000 $ за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 2: ", error);
          }
        }
      } else if (multiply == 3) {
        user.c2 += 3;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 3 Золотых-кейса за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 3: ", error);
          }
        }
      } else if (multiply == 4) {
        user.rubli += 1;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 1 рубль за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 4: ", error);
          }
        }
      }
    }

    if (user.refcount > 10 && user.refcount < 100) {
      if (multiply == 1) {
        user.c3 += 2;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 2 донат-кейс за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 1: ", error);
          }
        }
      } else if (multiply == 2) {
        user.balance += 20000000;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 20.000.000 $ за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 2: ", error);
          }
        }
      } else if (multiply == 3) {
        user.c2 += 5;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 5 Золотых-кейсов за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 3: ", error);
          }
        }
      } else if (multiply == 4) {
        user.rubli += 2;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 2 рубля за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 4: ", error);
          }
        }
      }
    }

    if (user.refcount == 666) {
      user.stars5 = true;
      if (user.notifications) {
        try {
          await vk.api.messages.send({
            user_id: user.id,
            message: "УВЕДОМЛЕНИЕ ✅\n" +
              "▶ Вам начислена лучшая звезда за то что игрок указал, что вы его пригласили!\n" +
              "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
              keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                  [{
                    "action": {
                      "type": "text",
                      payload: JSON.stringify({ command: `уведомления выкл` }),
                      "label": `🔕`
                    },
                    "color": "negative"
                  },
          ]
                ]
              }),
            random_id: 0
          });
        } catch (error) {
          console.error("Ошибка отправки сообщения при refcount == 666: ", error);
        }
      }
    }

    if (user.refcount > 100 && user.refcount != 666) {
      if (multiply == 1) {
        user.c3 += 3;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 3 донат-кейс за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 1: ", error);
          }
        }
      } else if (multiply == 2) {
        user.balance += 50000000;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 50.000.000 $ за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 2: ", error);
          }
        }
      } else if (multiply == 3) {
        user.c2 += 10;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 10 Золотых-кейсов за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 3: ", error);
          }
        }
      } else if (multiply == 4) {
        user.rubli += 3;
        if (user.notifications) {
          try {
            await vk.api.messages.send({
              user_id: user.id,
              message: "УВЕДОМЛЕНИЕ ✅\n" +
                "▶ Вам начислено 3 рубля за то что игрок указал, что вы его пригласили!\n" +
                "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                keyboard: JSON.stringify({
                  "inline": true,
                  "buttons": [
                    [{
                      "action": {
                        "type": "text",
                        payload: JSON.stringify({ command: `уведомления выкл` }),
                        "label": `🔕`
                      },
                      "color": "negative"
                    },
            ]
                  ]
                }),
              random_id: 0
            });
          } catch (error) {
            console.error("Ошибка отправки сообщения при multiply == 4: ", error);
          }
        }
      }
    }

    if (user.refcount % 20 == 0) {
      user.c6 += 1;
      if (user.notifications) {
        try {
          await vk.api.messages.send({
            user_id: user.id,
            message: "УВЕДОМЛЕНИЕ ✅\n" +
              "▶ Вам начислен 1 Секретный-кейс за то что игрок указал, что вы его пригласили!\n" +
              "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
              keyboard: JSON.stringify({
                "inline": true,
                "buttons": [
                  [{
                    "action": {
                      "type": "text",
                      payload: JSON.stringify({ command: `уведомления выкл` }),
                      "label": `🔕`
                    },
                    "color": "negative"
                  },
          ]
                ]
              }),
            random_id: 0
          });
        } catch (error) {
          console.error("Ошибка отправки сообщения при refcount % 20 == 0: ", error);
        }
      }
    }
  

    message.user.c3 += 2;

    return bot("✅Вы получили 2 донат-кейсов за указание пригласившего вас игрока✅")
  }
});



cmd.hear(/^(?:реф)\s([^]+)$/i, async (message, bot) => {

  if (!message.isChat || message.chat.type === 1) {
    let f = message.text.split(" ");

    let m = /^(?:https)\:\/\/(?:vk.com)\//i;



    if (m.test(message.args[1])) {

      message.args[1] = message.args[1].replace(/(?:https)\:\/\/(?:vk.com)\//gi, "");

      await vk.api.utils.resolveScreenName({ screen_name: message.args[1] })

        .then(async (res) => {

          let user = double.find(x => x.id === res.object_id);

          if (!user) return bot(`Неверный URL игрока!`);



          if (user.id == message.user.id) return bot("Вы указали сами себя");

          if (!user) return bot("ID не найден");

          if (message.user.ref == true) return bot("Вы уже получили бонус за реферала")

          message.user.ref = true

          multiply = [1, 2, 3, 4];

          multiply = utils.pick(multiply)

          user.refcount += 1;

          user.fertilizer += 2;

          user.water += 2;

          if (user.refcount < 10) {
            if (multiply == 1) {
              user.c3 += 1;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ✅\n" +
                      "▶ Вам начислен 1 донат-кейс за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 2) {
              user.balance += 10000000;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 10.000.000 $ за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 3) {
              user.c2 += 3;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 3 Золотых-кейса за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 4) {
              user.rubli += 1;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 1 рубль за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            }
          }

          if (user.refcount > 10 && user.refcount < 100) {
            if (multiply == 1) {
              user.c3 += 2;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 2 донат-кейс за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 2) {
              user.balance += 20000000;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 20.000.000 $ за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 3) {
              user.c2 += 5;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 5 Золотых-кейсов за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 4) {
              user.rubli += 2;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 2 рубля за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            }
          }

          if (user.refcount == 666) {
            user.stars5 = true;
            if (user.notifications) {
              try {
                await vk.api.messages.send({
                  user_id: user.id,
                  message: "УВЕДОМЛЕНИЕ ✅\n" +
                    "▶ Вам начислена лучшая звезда за то что игрок указал, что вы его пригласили!\n" +
                    "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                    keyboard: JSON.stringify({
                      "inline": true,
                      "buttons": [
                        [{
                          "action": {
                            "type": "text",
                            payload: JSON.stringify({ command: `уведомления выкл` }),
                            "label": `🔕`
                          },
                          "color": "negative"
                        },
                ]
                      ]
                    }),
                  random_id: 0
                });
              } catch (error) {
                console.error("");
              }
            }
          }

          if (user.refcount > 100 && user.refcount != 666) {
            if (multiply == 1) {
              user.c3 += 3;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 3 донат-кейс за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 2) {
              user.balance += 50000000;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 50.000.000 $ за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 3) {
              user.c2 += 10;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 10 Золотых-кейсов за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            } else if (multiply == 4) {
              user.rubli += 3;
              if (user.notifications) {
                try {
                  await vk.api.messages.send({
                    user_id: user.id,
                    message: "УВЕДОМЛЕНИЕ ✅\n" +
                      "▶ Вам начислено 3 рубля за то что игрок указал, что вы его пригласили!\n" +
                      "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                      keyboard: JSON.stringify({
                        "inline": true,
                        "buttons": [
                          [{
                            "action": {
                              "type": "text",
                              payload: JSON.stringify({ command: `уведомления выкл` }),
                              "label": `🔕`
                            },
                            "color": "negative"
                          },
                  ]
                        ]
                      }),
                    random_id: 0
                  });
                } catch (error) {
                  console.error("");
                }
              }
            }
          }

          if (user.refcount % 20 == 0) {
            user.c6 += 1;
            if (user.notifications) {
              try {
                await vk.api.messages.send({
                  user_id: user.id,
                  message: "УВЕДОМЛЕНИЕ ✅\n" +
                    "▶ Вам начислен 1 Секретный-кейс за то что игрок указал, что вы его пригласили!\n" +
                    "🔕 Введите «Уведомления выкл», если не хотите получать подобные сообщения.",
                    keyboard: JSON.stringify({
                      "inline": true,
                      "buttons": [
                        [{
                          "action": {
                            "type": "text",
                            payload: JSON.stringify({ command: `уведомления выкл` }),
                            "label": `🔕`
                          },
                          "color": "negative"
                        },
                ]
                      ]
                    }),
                  random_id: 0
                });
              } catch (error) {
                console.error("");
              }
            }
          }

          message.user.c3 += 5;

          return bot("Вы получили 5 донат-кейсов за указание пригласившего вас игрока)")

        })

    }


  }
});

cmd.hear(
  /^(?:реф|🏆 реферал|реферал|@club223500959 реф|@club223500959 реферал|реферальная система)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 1) {

      const groupInfo = await vk.api.call('groups.getById', {
        access_token: tokenData.token,
        v: '5.131',
      });

      if (!groupInfo || groupInfo.length === 0) {
        throw new Error('Не удалось получить информацию о группе.');
      }

      const groupId = groupInfo[0].id;


      let smileng = utils.pick([
        `🌷`,
        `🌸`,
        `🌹`,
        `🌺`,
        `🌼`,
        `💐`,
        `❤️`,
        `💓`,
        `💕`,
      ]); //utils.pick([`❄️`,`🎄`,`☃️`,`🎅`]);

      let ref = `https://vk.me/club${groupId}?ref=${message.senderId}&ref_source=${message.senderId}`;

      let refka = await vk.api.utils.getShortLink({ url: ref });

      return bot(`Вы пригласили ${utils.sp(
        message.user.refcount
      )} пользователей ${smileng}

💰 За приглашение Вы получите один из призов:
👥 До 10 приглашённых - может выпасть: 1 донат-кейс, 3 золотых кейса, 1 рубль, 10.000.000 $
👥 До 100 приглашённых- может выпасть: 2 донат-кейса, 20.000.000 $ или 5 золотых кейсов, 2 рубля
👥 До 10000 приглашённых - может выпасть: 3 донат-кейса, 50.000.000 $ , 10 золотых кейсов, 3 рубля
👥 За каждого 20 игрока даётся секретный кейс
👥 За 666 приглашённых вы получите звезду «Донатный гигант», прибыль: 30 ЧакоРуб/час

📌 Ваша реферальная ссылка: ${refka.short_url}

`);
    }
  }
);



let STATIC_REF_LINK = 'https://vk.me/club228340301?ref=богач';


cmd.hear(
  /^(?:система)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 4) {
      let ref = STATIC_REF_LINK
      let refka = await vk.api.utils.getShortLink({ url: ref });

      return bot(`
📌 Ваша ссылка: ${refka.short_url}
`);
    }
  }
);


cmd.hear(
  /^(?:сброс)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type === 4) {
      double.forEach(user => {
        user.perexod = false;
      });
      return message.send("♻ Переходы сброшены!");
    }
  }
);

cmd.hear(
  /^(?:самобан)$/i,
  async (message, bot) => {
    if (!message.isChat || message.chat.type >= 1) {
      message.user.bans.ban = true
      message.user.bans.reason = 'Самобан.'
      return bot(`
Готово.
`);
    }
  }
);



module.exports = commands;
