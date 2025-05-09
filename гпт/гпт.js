// main.js (или index.js) - ОБНОВЛЕННАЯ ВЕРСИЯ БЕЗ KV STORE

// ** Зависимости (Установите их через npm install) **
const fs = require('fs');
const path = require('path'); // Добавлено для работы с путями к файлам

const commands = [];

const cmd = {
    hear: (pattern, action) => {
        commands.push([pattern, action]);
    }
};
console.log('cmd object initialized:', cmd);

// ** Cloudflare AI Configuration (Замените своими значениями) **
const ACCOUNT_ID = '8d4f01716f0126f43447b62df1ed5104';
// ** IMPORTANT: Store API_TOKEN securely (e.g., environment variable) **
const API_TOKEN = 'yfGoOqaszPvsn518likFh7H7FEzzXr_asvUy1mGP'; // Replace with your actual token
console.log('Cloudflare AI Configuration initialized:', { ACCOUNT_ID, API_TOKEN: API_TOKEN.substring(0, 4) + '...' }); // Mask the token in logs

// ** Queue Name (Замените своими значениями) **
// const QUEUE_NAME = 'my-queue'; // УДАЛЕНО: Больше не используется
// console.log('QUEUE_NAME initialized:', QUEUE_NAME);

const TOKENS_FILE_PATH = './настройки/токены.json'; //Путь к файлу с токеном
console.log('TOKENS_FILE_PATH initialized:', TOKENS_FILE_PATH);

// ** Models **
//const MODEL_REQUEST_HANDLER = 'cloudflare/llama-3-scout-17b-16e-instruct'; //LLM3
const MODEL_REQUEST_HANDLER = '@cf/meta/llama-3-8b-instruct'; //LLM3
//const MODEL_DATA_ANALYZER = 'cloudflare/llama-3-scout-17b-16e-instruct'; //LLM1
const MODEL_DATA_ANALYZER = '@cf/meta/llama-3-8b-instruct'; //LLM1
//const MODEL_CODE_GENERATOR = 'cloudflare/llama-3-scout-17b-16e-instruct'; //LLM2
const MODEL_CODE_GENERATOR = '@cf/meta/llama-3-8b-instruct'; //LLM2
//const MODEL_LEARNING = 'cloudflare/llama-3-scout-17b-16e-instruct'; //LLM4
const MODEL_LEARNING = '@cf/meta/llama-3-8b-instruct'; //LLM4
const MODEL_EMBEDDING = 'nomic-ai/nomic-embed-text';
console.log('Models initialized:', {
    MODEL_REQUEST_HANDLER,
    MODEL_DATA_ANALYZER,
    MODEL_CODE_GENERATOR,
    MODEL_LEARNING,
    MODEL_EMBEDDING
});

// ** Token Functions **
function getToken() {
    console.log('getToken: Function called');
    try {
        console.log('getToken: Attempting to read tokens from file:', TOKENS_FILE_PATH);
        const tokens = JSON.parse(fs.readFileSync(TOKENS_FILE_PATH, 'utf8'));
        console.log('getToken: Tokens read from file:', tokens);
        return tokens;
    } catch (error) {
        console.error('getToken: Error reading tokens:', error);
        return null;
    }
}

function saveTokens(token, spoler, chatlogi) {
    console.log('saveTokens: Function called with:', { token, spoler, chatlogi });
    const tokens = {
        token: token,
        spoler: spoler,
        chatlogi: chatlogi
    };
    console.log('saveTokens: Tokens object created:', tokens);

    try {
        console.log('saveTokens: Attempting to write tokens to file:', TOKENS_FILE_PATH);
        fs.writeFileSync(TOKENS_FILE_PATH, JSON.stringify(tokens, null, 2), 'utf8');
        console.log('saveTokens: Tokens successfully saved.');
    } catch (error) {
        console.error('Error saving tokens:', error);
    }
}

// ** Cloudflare AI Helper Function **
async function generateText(model, prompt) {
    console.log(`generateText: Called with model: ${model}, prompt: ${prompt}`);
    try {
        const body = JSON.stringify({
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]
        });
        console.log("generateText: Request body:", body);

        const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${model}`;
        console.log("generateText: URL:", url);

        const headers = {
            Authorization: `Bearer ${API_TOKEN}`, // ** ENSURE THIS IS CORRECT **
            'Content-Type': 'application/json'
        };
        console.log("generateText: Headers:", headers);  // Log headers to check the token

        // **ADDED: Log the full URL before the fetch**
        console.log("generateText: Full Request URL:", url);

        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        console.log("generateText: Response received:", response);

        if (!response.ok) {
            console.error(`generateText: HTTP error! status: ${response.status}, statusText: ${response.statusText}`);
            try {
                const errorBody = await response.text();
                console.error("generateText: Error body:", errorBody);

                // ** ADDED:  Parse error body and log structured error information **
                try {
                    const errorJson = JSON.parse(errorBody);
                    console.error("generateText: Error JSON:", errorJson); // Log parsed JSON
                } catch (jsonError) {
                    console.error("generateText: Could not parse error body as JSON:", jsonError);
                }

            } catch (e) {
                console.error("generateText: Could not read error body", e);
            }
            return {
                error: `HTTP error! status: ${response.status}, statusText: ${response.statusText}`
            };
        }

        const data = await response.json();
        console.log("generateText: Response data:", data);

        if (data && data.success) {
            console.log("generateText: Success, returning response");
            return data.result.response;
        } else {
            console.error('generateText: AI call failed:', data.errors);
            return {
                error: `AI call failed: ${data.errors ? JSON.stringify(data.errors) : 'Unknown error'}`
            };
        }
    } catch (error) {
        console.error('generateText: Error during request:', error);
        return {
            error: `Request error: ${error.message}`
        };
    }
}

// **  Удалены функции getContext и saveContext (KV Store) **

// ** Cloudflare Queues Helper Function (Example) **
// async function sendMessageToQueue(queueName, message) { // УДАЛЕНО: Больше не используется
//     console.log(`sendMessageToQueue: Sending message to queue ${queueName}:`, message);
//     try {
//         const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/queues/producers/${queueName}`;
//         console.log("sendMessageToQueue: URL:", url);

//         const response = await fetch(url, {
//             method: 'POST',
//             headers: {
//                 Authorization: `Bearer ${API_TOKEN}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify([message]), // Queues accept an array of messages
//         });

//         console.log("sendMessageToQueue: Response received:", response);

//         if (!response.ok) {
//             console.error(`sendMessageToQueue: Error sending message to queue: ${response.status}`);
//             try {
//                 const errorBody = await response.text();
//                 console.error("sendMessageToQueue: Error body:", errorBody);
//             } catch (e) {
//                 console.error("sendMessageToQueue: Could not read error body", e);
//             }
//         } else {
//             console.log("sendMessageToQueue: Message sent successfully");
//         }


//     } catch (error) {
//         console.error('sendMessageToQueue: Error sending message to queue:', error);
//     }
// }
async function getEmbedding(text) {
    console.log(`getEmbedding: Getting embedding for text: ${text}`);
    try {
        const url = `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL_EMBEDDING}`;
        console.log("getEmbedding: URL:", url);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: text
            })
        });
        console.log("getEmbedding: Response received:", response);


        if (!response.ok) {
            console.error(`getEmbedding: HTTP error while getting embedding: ${response.status}`);
            try {
                const errorBody = await response.text();
                console.error("getEmbedding: Error body:", errorBody);
            } catch (e) {
                console.error("getEmbedding: Could not read error body", e);
            }
            return {
                error: `HTTP error: ${response.status}`
            };
        }

        const data = await response.json();
        console.log(`getEmbedding: Embedding result:`, data);

        if (data && data.success) {
            return data.result.embedding;
        } else {
            console.error('getEmbedding: Error calling AI for embedding:', data.errors);
            return {
                error: `Error calling AI: ${data.errors ? JSON.stringify(data.errors) : 'Unknown error'}`
            };
        }
    } catch (error) {
        console.error('getEmbedding: Error during request to Cloudflare AI for embedding:', error);
        return {
            error: `Request error: ${error.message}`
        };
    }
}

// ** getBotCodeStructure Function (Replace with your implementation!) **
function getBotCodeStructure() {
    console.log('getBotCodeStructure: Getting bot code structure.');

    const commandsDir = './команды';  // Папка с командами
    let structure = `The bot uses vk-io. Commands are registered via cmd.hear(). `;

    try {
        const files = fs.readdirSync(commandsDir);  // Читаем список файлов
        structure += `The bot commands are defined in the following files: ${files.join(', ')}. `;

        // Читаем содержимое файлов и выявляем общие элементы
        let commonElements = {
            requires: [], // fs, path, и т.д.
            exports: false // Наличие module.exports
        };
        for (const file of files) {
            const filePath = path.join(commandsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');

            // Проверяем наличие require
            const requires = fileContent.matchAll(/require\(['"](.*?)['"]\)/g);
            for (const match of requires) {
                if (!commonElements.requires.includes(match[1])) {
                    commonElements.requires.push(match[1]);
                }
            }

            // Проверяем наличие module.exports
            if (fileContent.includes('module.exports = commands')) {
                commonElements.exports = true;
            }
        }

        structure += `\nCommon elements: Requires: ${commonElements.requires.join(', ')}. Module.exports: ${commonElements.exports ? 'yes' : 'no'}.`;

        // Добавляем пример структуры команды
        if (files.length > 0) {
            const firstFile = path.join(commandsDir, files[0]);
            const firstFileContent = fs.readFileSync(firstFile, 'utf8');
            structure += `\nExample command structure:\n\`\`\`javascript\n${firstFileContent.substring(0, 200)}\n\`\`\``; // Берем только первые 200 символов
        }

        // Добавляем информацию о commonElements в структуру
        structure += `\nCommon requires: ${JSON.stringify(commonElements.requires)}. Exports commands: ${commonElements.exports}`;
        commonElements.requires = [...new Set(commonElements.requires)];

    } catch (err) {
        console.error("Could not read command files:", err);
        structure += `Could not read command files.`;
    }

    console.log('getBotCodeStructure: Bot code structure:', structure);
    return structure;
}

// ** Request Reception Module **
async function handleRequest(message, generateText) {
    console.log(`handleRequest: Handling request: ${message}`);
    const prompt = `Classify the user's request and extract information: "${message}". Request type: (command creation, command modification, communication, ...). Command name: (if any). Description: (if any). JSON format.`;
    console.log("handleRequest: Prompt:", prompt);

    try {
        const jsonResult = await generateText(MODEL_REQUEST_HANDLER, prompt); // Use MODEL_REQUEST_HANDLER
        console.log(`handleRequest: Result from generateText:`, jsonResult);
        if (jsonResult.error) {
            console.log(`handleRequest: Error in generateText result:`, jsonResult.error);
            return {
                error: jsonResult.error
            };
        }

        // **ИЗМЕНЕНИЕ: Больше не пытаемся парсить JSON, просто берем текст**
        const requestData = jsonResult; // Берем текст ответа, а не пытаемся его распарсить
        console.log(`handleRequest: Extracted request data:`, requestData);
        return { description: requestData }; //  Возвращаем данные в виде объекта

    } catch (error) {
        console.error("handleRequest: Error handling request:", error);
        return {
            error: "Failed to process request"
        };
    }
}

// ** Data Analysis Module **
async function analyzeData(requestData, getBotCodeStructure, generateText) {
    console.log(`analyzeData: Analyzing data for request:`, requestData);
    const botCodeStructure = getBotCodeStructure();
    const prompt = `Analyze the bot's code structure: ${botCodeStructure} and the user's request: ${JSON.stringify(requestData)}.  What is the best way to implement the command, including any common "requires" (fs, path, etc.) and using module.exports = commands if necessary, given the existing code style and structure? Return ONLY a description of how the command should be implemented, not the code itself.`;

    console.log("analyzeData: Prompt:", prompt);

    try {
        const analysisResult = await generateText(MODEL_DATA_ANALYZER, prompt); // Use MODEL_DATA_ANALYZER
        console.log(`analyzeData: Analysis result from generateText:`, analysisResult);
        if (analysisResult.error) {
            console.log(`analyzeData: Error in analysisResult:`, analysisResult.error);
            return {
                error: analysisResult.error
            };
        }

        const data = analysisResult;
        console.log(`analyzeData: Analysis data:`, data);
        return { analysis: data };

    } catch (error) {
        console.error("analyzeData: Error analyzing data:", error);
        return {
            error: "Failed to analyze data"
        };
    }
}

async function generateCode(requestData, analysisData, generateText) {
    console.log(`generateCode: Generating code for request:`, requestData, `and analysis data:`, analysisData);
    const prompt = `Given the following user request: ${JSON.stringify(requestData)}, the implementation analysis: ${JSON.stringify(analysisData)}, and the knowledge that the bot uses vk-io and existing commands use cmd.hear(), generate ONLY the concise JavaScript code for a single bot command.  Include necessary requires (if any) and ensure it's a complete, valid command. If existing command files use module.exports, include it as well. There should be no comments, explanations, or file declarations. If "requires" are needed put them on top.`;
    console.log("generateCode: Prompt:", prompt);

    try {
        const codeResult = await generateText(MODEL_CODE_GENERATOR, prompt); // Use MODEL_CODE_GENERATOR
        console.log(`generateCode: Code generation result from generateText:`, codeResult);

        if (codeResult.error) {
            console.log(`generateCode: Error in codeResult:`, codeResult.error);
            return {
                error: codeResult.error
            };
        }

        // **Удаляем лишние пояснения и форматируем код**
        let code = codeResult; // Берем текст ответа
        code = code.replace(/^\/\/.*$/gm, '').trim(); // Удаляем комментарии
        code = code.replace(/```javascript/gi, '').trim(); // Удаляем ```javascript
        code = code.replace(/```/gi, '').trim(); // Удаляем ```
        // Удаляем "Here is the code..." и прочие приветствия
        code = code.replace(/^(Here is the code for the bot command:|Here is the code:|Based on the analysis, here is a sample bot code structure|Here is the code for the bot command:|The code is:|This code defines a command that listens for the phrase)/gi, '').trim();
        // Удаляем "cmd.hear" в начале, если оно там есть (может быть лишним)
        code = code.replace(/^cmd\.hear/i, 'cmd.hear');

        console.log(`generateCode: Generated code:`, code);
        return {
            code: code
        };

    } catch (error) {
        console.error("generateCode: Error generating code:", error);
        return {
            error: "Failed to generate code"
        };
    }
}

// ** Learning Module (EXAMPLE, NEEDS IMPLEMENTATION) **
async function learningModule(generatedCode, requestData, analyzeData, generateText) {
    // **TODO: Implement error-based learning logic**
    console.log("learningModule: Learning module: ", generatedCode, requestData);
    return {
        success: true
    }
}

// ** Security Module (Example) **
async function analyzeCodeSecurity(code) {
    console.log(`analyzeCodeSecurity: Analyzing code security: ${code}`);
    //  A simple example, needs to be replaced with something more robust!
    const badKeywords = ["fs.", "require(", "eval("];
    for (const keyword of badKeywords) {
        if (code.includes(keyword)) {
            console.log(`analyzeCodeSecurity: Unsafe keyword detected: ${keyword}`);
            return {
                safe: false,
                reason: `Code contains a forbidden word: ${keyword}`
            };
        }
    }
    console.log(`analyzeCodeSecurity: Code is safe.`);
    return {
        safe: true
    };
}

// ** cmd.hear() Command (Example) **
cmd.hear(/^(?:создай команду)\s+(.*)$/i, async (message, bot) => {
    console.log(`cmd.hear: Received command "создай команду" from user ${message.senderId}`);
    if (message.user.settings.adm < 6) {
        console.log(`cmd.hear: Access denied. Admin level ${message.user.settings.adm} is insufficient.`);
        return;
    }

    // Get the command argument from the regular expression result
    const commandRequest = message.text.match(/^(?:создай команду)\s+(.*)$/i)[1];
    console.log(`cmd.hear: Command request: ${commandRequest}`);

    const userId = message.senderId; // Get the user ID
    console.log(`cmd.hear: User ID: ${userId}`);

    // **  Logic related to KV removed **

    // **  Request Reception Module **
    console.log(`cmd.hear: Calling handleRequest with commandRequest: ${commandRequest}`);
    const requestData = await handleRequest(commandRequest, generateText); // Pass generateText
    console.log(`cmd.hear: Request data:`, requestData);

    if (requestData.error) {
        console.log(`cmd.hear: Error in request ${requestData.error}`);
        return message.reply(`Error: ${requestData.error}`);
    }

    // ** Data Analysis **
    console.log(`cmd.hear: Calling analyzeData with requestData:`, requestData);
    const analysisData = await analyzeData(requestData, getBotCodeStructure, generateText); // Pass the structure retrieval and text generation function
    console.log(`cmd.hear: Analysis data:`, analysisData);
    if (analysisData.error) {
        console.log(`cmd.hear: Analysis error: ${analysisData.error}`);
        return message.reply(`Analysis error: ${analysisData.error}`);
    }

    // ** Code Generation **
    console.log(`cmd.hear: Calling generateCode with requestData:`, requestData, `and analysisData:`, analysisData);
    const generatedCode = await generateCode(requestData, analysisData, generateText);
    console.log(`generateCode: Generated code:`, generatedCode);
    if (generatedCode.error) {
        console.log(`cmd.hear: Code generation error: ${generatedCode.error}`);
        return message.reply(`Generation error: ${generatedCode.error}`);
    }

    // ** Code Security Analysis **
    console.log(`cmd.hear: Calling analyzeCodeSecurity with generatedCode:`, generatedCode);
    const securityResult = await analyzeCodeSecurity(generatedCode.code);
    console.log(`cmd.hear: Security analysis result:`, securityResult);
    if (!securityResult.safe) {
        console.log(`cmd.hear: Security error: ${securityResult.reason}`);
        return message.reply(`Security error: ${securityResult.reason}`);
    }

    // ** Learning Module **
    console.log(`cmd.hear: Calling learningModule with generatedCode:`, generatedCode, `requestData:`, requestData, `and analysisData:`, analysisData);
    const learningResult = await learningModule(generatedCode, requestData, analyzeData, generateText); // Need to implement this module
    console.log(`cmd.hear: Learning result:`, learningResult);
    if (learningResult.error) {
        console.log(`cmd.hear: Learning error: ${learningResult.error}`);
        return message.reply(`Learning error: ${learningResult.error}`);
    }

    // **Here is the code to add the new command to commands.js **
    // ** This is VERY DANGEROUS and requires sandboxing or static analysis **
    if (generatedCode && generatedCode.code) {
        // Here is the code to add the command to the file (DANGEROUS, but for example)
        console.log(`cmd.hear: Appending generated code to commands.js`);
        fs.appendFile('./commands.js', `\n${generatedCode.code}`, (err) => {
            if (err) {
                console.error('cmd.hear: Error appending command to file:', err);
                message.reply('Error adding command to file.');
            } else {
                console.log('cmd.hear: Command successfully appended to file.');
                message.reply('Command successfully created and added to the file. (Bot restart required)');
            }
        });
    } else {
        console.log('cmd.hear: Failed to generate command code.');
        message.reply('Failed to generate command code.');
    }

    // ** Save the context in a variable **
    // Replaced KV Store with a variable in memory
    // Context for each user:
    const userContext = {}; // Initialize an object to store contexts

    const newMessage = {
        role: "bot",
        content: `Command created: ${commandRequest}`
    };
    if (!userContext[userId]) { // Check if the context exists for the user
        userContext[userId] = []; // If not, create an empty array
    }
    userContext[userId].push(newMessage);
    if (userContext[userId].length > 30) {
        userContext[userId].shift();
    }
    console.log(`cmd.hear: Context saved.`);

});
console.log('cmd.hear command registered');
// ** Export Commands **
module.exports = commands;