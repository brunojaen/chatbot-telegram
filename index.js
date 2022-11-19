

const telegramBot = require('node-telegram-bot-api')
const dialogflow = require('./dialogflow')
const youtube = require('./youtube')

const token = '5951013542:AAFHrd9rQ0tALj1ahWjsCW7fx82PpcMYj4s'

const bot = new telegramBot(token, { polling: true })

bot.on('message', async function (msg) {
    const chatId = msg.chat.id
    console.log(msg.text)

    const dfResponse = dialogflow.sendMessage(chatId.toString(), msg.text)

    let responseText = dfResponse.text
    if (dfResponse.intent === 'Treino Especifico'){
        responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.corpo.stringValue)
    }


    bot.sendMessage(chatId, dfResponse.text)
});