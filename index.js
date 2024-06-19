// const TelegramBot = require('node-telegram-bot-api');
// const express = require('express');
// const app = express();
// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');
// const { TelegramClient } = require("telegram");
// const { StringSession } = require("telegram/sessions");
// const input = require("input");
// const request = require('request');
// const progress = require('progress-stream');
// const https = require('https'); // or 'https' for https:// URLs
// const { DownloaderHelper } = require('node-downloader-helper');
// const { error } = require('console');


// require('dotenv').config({
//     path: './.env'
// });

// const apiId = parseInt(process.env.API_ID);
// const apiHash = process.env.API_HASH;
// const stringSession = new StringSession(process.env.SESSION); // fill this later with the value from session.save()

// // replace the value below with the Telegram token you receive from @BotFather
// const token = process.env.BOT_TOKEN;

// // Create a bot that uses 'polling' to fetch new updates
// const bot = new TelegramBot(token, { polling: true });

// // Matches "/start"
// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;

//     // send a message to the chat acknowledging receipt of their message
//     bot.sendMessage(chatId, 'Hello! 😊 Please give me a Terra link 🌍 and I will provide you with a video 🎥 and direct download link ⬇️.');
// });

// // Listen for any kind of message
// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;

//     // Ignore '/start' command
//     if (text === '/start') {
//         return;
//     }
//     // Regular expression for the Terra box links
//     const patterns = [
//         /ww\.mirrobox\.com|www\.nephobox\.com|freeterabox\.com|www\.freeterabox\.com|1024tera\.com|4funbox\.co|www\.4funbox\.com|mirrobox\.com|nephobox\.com|terabox\.app|terabox\.com|www\.terabox\.ap|terabox\.fun|www\.terabox\.com|www\.1024tera\.co|www\.momerybox\.com|teraboxapp\.com|momerybox\.com|tibibox\.com|www\.tibibox\.com|www\.teraboxapp\.com/,
//     ];


//     if (!patterns.some(pattern => pattern.test(text))) {
//         console.log('Please enter a valid Terra box link.');
//         bot.sendMessage(chatId, 'Please enter a valid Terra box link.');
//     } else {
//         const url = text;
//         console.log(msg);

//         // Regular expression for the first pattern with optional 'https://' and 'www.'
//         const pattern1 = /(?:https?:\/\/)?(?:www\.)?(teraboxapp|1024terabox|freeterabox|1024tera)\.com\/s\/(?:1)?([^\/]+)/;
//         // Regular expression for the second pattern with optional 'https://' and 'www.'
//         const pattern2 = /(?:https?:\/\/)?(?:www\.)?(terabox|1024tera)\.(app|com)\/sharing\/link\?surl=([^&]+)/;

//         let surl;
//         if (pattern1.test(url)) {
//             // If URL matches the first pattern
//             surl = url.match(pattern1)[2];
//         } else if (pattern2.test(url)) {
//             // If URL matches the second pattern
//             surl = url.match(pattern2)[3];
//         }

//         const fetched_dl_link = `https://www.terabox.app/share/list?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=${process.env.JS_TOKEN}&dp-logid=${process.env.DP_LOG_ID}&page=1&num=20&by=name&order=asc&site_referer=https%3A%2F%2Fwww.terabox.app%2Fsharing%2Flink%3Fsurl%3DG0lgOotR0THhZCDLBacZPQ&shorturl=${surl}&root=1`;

//         try {
//             const response = await axios.get(fetched_dl_link, {
//                 headers: {
//                     'User-Agent': 'Mozilla/5.0',
//                     'Referer': 'https://www.terabox.app/share/list?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=1&dp-logid=1&page=1&num=20&by=name&order=asc&site_referer=https%3A%2F%2Fwww.terabox.app%2Fsharing%2Flink%3Fsurl%3DG0lgOotR0THhZCDLBacZPQ&shorturl=',
//                     'Cookie': process.env.COOKIE
//                 }
//             });

//             const data = response.data;
//             if (data.title && data.list && data.list.length > 0 && data.list[0].dlink) {
//                 const file_name = `@gokuthecoder - `+data.title.replace(/\//g, '');
//                 const fileUrl = data.list[0].dlink;

//                 console.log(file_name, fileUrl);

//                 //HERE IS DOWNLAODING CODE

//                 await axios({
//                     method: 'get',
//                     url: fileUrl,
//                     responseType: 'stream',
//                     headers: {
//                         'User-Agent': 'Mozilla/5.0',
//                         "Connection": "keep-alive",
//                         "Accept": "*/*",
//                         "Accept-Encoding": "gzip, deflate, br",
//                         "Cookie": process.env.COOKIE,
//                     },
//                     maxRedirects: 5, // This will follow up to 5 redirects
//                     maxContentLength: Infinity, // Set to Infinity to handle large responses
//                     maxBodyLength: Infinity,
//                 }).then(async function (response) {
//                     const writer = await fs.createWriteStream(file_name);
//                     response.data.pipe(writer);

//                     return new Promise((resolve, reject) => {
//                         writer.on('finish', resolve);
//                         writer.on('error', reject);
//                     });
//                 }).then(() => {
//                     console.log('Download completed.');
//                 }).catch((err) => {
//                     console.error(err);
//                 });


//                 bot.sendMessage(chatId, `\`${file_name}\`\n\n\`${fileUrl}\``, { parse_mode: 'Markdown' });
//             } else {
//                 throw new Error('Invalid response structure');
//             }
//         } catch (error) {
//             console.error(error);
//             bot.sendMessage(chatId, 'An error occurred while fetching the download link. Please try again later.');
//         }
//     }
// });


// const TelegramBot = require('node-telegram-bot-api');
// const fs = require('fs');
// const axios = require('axios');
// const { TelegramClient, Api } = require('telegram');
// const { StringSession } = require('telegram/sessions');
// const input = require('input');
// require('dotenv').config({ path: './.env' });

// const apiId = parseInt(process.env.API_ID);
// const apiHash = process.env.API_HASH;
// const stringSession = new StringSession(process.env.SESSION);
// let channelUsername = process.env.CHANNEL;

// const token = process.env.BOT_TOKEN;
// const bot = new TelegramBot(token, { polling: true });

// const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });

// bot.onText(/\/start/, (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, 'Hello! 😊 Please give me a Terra link 🌍 and I will provide you with a video 🎥 and direct download link ⬇️.');
// });

// bot.on('message', async (msg) => {
//     const chatId = msg.chat.id;
//     const text = msg.text;

//     if (text === '/start') {
//         return;
//     }

//     const patterns = [
//         /ww\.mirrobox\.com|www\.nephobox\.com|freeterabox\.com|www\.freeterabox\.com|1024tera\.com|4funbox\.co|www\.4funbox\.com|mirrobox\.com|nephobox\.com|terabox\.app|terabox\.com|www\.terabox\.ap|terabox\.fun|www\.terabox\.com|www\.1024tera\.co|www\.momerybox\.com|teraboxapp\.com|momerybox\.com|tibibox\.com|www\.tibibox\.com|www\.teraboxapp\.com/,
//     ];

//     if (!patterns.some(pattern => pattern.test(text))) {
//         bot.sendMessage(chatId, 'Please enter a valid Terra box link.');
//         return;
//     }

//     const url = text;
//     const pattern1 = /(?:https?:\/\/)?(?:www\.)?(teraboxapp|1024terabox|freeterabox|1024tera)\.com\/s\/(?:1)?([^\/]+)/;
//     const pattern2 = /(?:https?:\/\/)?(?:www\.)?(terabox|1024tera)\.(app|com)\/sharing\/link\?surl=([^&]+)/;

//     let surl;
//     if (pattern1.test(url)) {
//         surl = url.match(pattern1)[2];
//     } else if (pattern2.test(url)) {
//         surl = url.match(pattern2)[3];
//     }

//     const fetched_dl_link = `https://www.terabox.app/share/list?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=${process.env.JS_TOKEN}&dp-logid=${process.env.DP_LOG_ID}&page=1&num=20&by=name&order=asc&site_referer=https%3A%2F%2Fwww.terabox.app%2Fsharing%2Flink%3Fsurl%3DG0lgOotR0THhZCDLBacZPQ&shorturl=${surl}&root=1`;

//     try {
//         const response = await axios.get(fetched_dl_link, {
//             headers: {
//                 'User-Agent': 'Mozilla/5.0',
//                 'Referer': 'https://www.terabox.app/share/list?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=1&dp-logid=1&page=1&num=20&by=name&order=asc&site_referer=https%3A%2F%2Fwww.terabox.app%2Fsharing%2Flink%3Fsurl%3DG0lgOotR0THhZCDLBacZPQ&shorturl=',
//                 'Cookie': process.env.COOKIE
//             }
//         });

//         const data = response.data;
//         if (data.title && data.list && data.list.length > 0 && data.list[0].dlink) {
//             const file_name = `@gokuthecoder - ` + data.title.replace(/\//g, '');
//             const fileUrl = data.list[0].dlink;

//             console.log(file_name, fileUrl);

//             await axios({
//                 method: 'get',
//                 url: fileUrl,
//                 responseType: 'stream',
//                 headers: {
//                     'User-Agent': 'Mozilla/5.0',
//                     "Connection": "keep-alive",
//                     "Accept": "*/*",
//                     "Accept-Encoding": "gzip, deflate, br",
//                     "Cookie": process.env.COOKIE,
//                 },
//                 maxRedirects: 5,
//                 maxContentLength: Infinity,
//                 maxBodyLength: Infinity,
//             }).then(async function (response) {
//                 const writer = await fs.createWriteStream(file_name);
//                 response.data.pipe(writer);

//                 return new Promise((resolve, reject) => {
//                     writer.on('finish', resolve);
//                     writer.on('error', reject);
//                 });
//             }).then(() => {
//                 console.log('Download completed.');
//             }).catch((err) => {
//                 console.error(err);
//             });


//         await client.connect();

//             const getChannelId = async () => {
//                 try {
//                     const channel = await client.getEntity(channelUsername);
//                     const channelId = channel.id;
//                     console.log('Channel ID:', channelId);
//                     return channelId;
//                 } catch (error) {
//                     console.error('Failed to get channel ID:', error);
//                 }
//             };

//             const channelId = await getChannelId();

//             const uploadFile = async () => {
//                 try {
//                     const result = await client.sendFile(channelId, {
//                         file: file_name,
//                         caption: `@gokuthecoder - ` + data.title.replace(/\//g, ''),
//                     });
//                     console.log('File uploaded successfully:', result);
//                 } catch (error) {
//                     console.error('Error uploading file:', error);
//                 }
//             };

//             await uploadFile();

//             bot.sendMessage(chatId, `\`${file_name}\`\n\n\`${fileUrl}\``, { parse_mode: 'Markdown' });
//         } else {
//             throw new Error('Invalid response structure');
//         }
//     } catch (error) {
//         console.error(error);
//         bot.sendMessage(chatId, 'An error occurred while fetching the download link. Please try again later.');
//     }
// });


const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const axios = require('axios');
const { TelegramClient, Api } = require('telegram');
const { StringSession } = require('telegram/sessions');
const input = require('input');
require('dotenv').config({ path: './.env' });

const apiId = parseInt(process.env.API_ID);
const apiHash = process.env.API_HASH;
const stringSession = new StringSession(process.env.SESSION);
let channelUsername = process.env.CHANNEL;

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello! 😊 Please give me a Terra link 🌍 and I will provide you with a video 🎥 and direct download link ⬇️.');
});

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;

    if (text === '/start') {
        return;
    }

    const patterns = [
        /ww\.mirrobox\.com|www\.nephobox\.com|freeterabox\.com|www\.freeterabox\.com|1024tera\.com|4funbox\.co|www\.4funbox\.com|mirrobox\.com|nephobox\.com|terabox\.app|terabox\.com|www\.terabox\.ap|terabox\.fun|www\.terabox\.com|www\.1024tera\.co|www\.momerybox\.com|teraboxapp\.com|momerybox\.com|tibibox\.com|www\.tibibox\.com|www\.teraboxapp\.com/,
    ];

    if (!patterns.some(pattern => pattern.test(text))) {
        bot.sendMessage(chatId, 'Please enter a valid Terra box link.');
        return;
    }

    const url = text;
    const pattern1 = /(?:https?:\/\/)?(?:www\.)?(teraboxapp|1024terabox|freeterabox|1024tera)\.com\/s\/(?:1)?([^\/]+)/;
    const pattern2 = /(?:https?:\/\/)?(?:www\.)?(terabox|1024tera)\.(app|com)\/sharing\/link\?surl=([^&]+)/;

    let surl;
    if (pattern1.test(url)) {
        surl = url.match(pattern1)[2];
    } else if (pattern2.test(url)) {
        surl = url.match(pattern2)[3];
    }

    const fetched_dl_link = `https://www.terabox.app/share/list?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=${process.env.JS_TOKEN}&dp-logid=${process.env.DP_LOG_ID}&page=1&num=20&by=name&order=asc&site_referer=https%3A%2F%2Fwww.terabox.app%2Fsharing%2Flink%3Fsurl%3DG0lgOotR0THhZCDLBacZPQ&shorturl=${surl}&root=1`;

    try {
        const response = await axios.get(fetched_dl_link, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Referer': 'https://www.terabox.app/share/list?app_id=250528&web=1&channel=dubox&clienttype=0&jsToken=1&dp-logid=1&page=1&num=20&by=name&order=asc&site_referer=https%3A%2F%2Fwww.terabox.app%2Fsharing%2Flink%3Fsurl%3DG0lgOotR0THhZCDLBacZPQ&shorturl=',
                'Cookie': process.env.COOKIE
            }
        });

        const data = response.data;
        if (data.title && data.list && data.list.length > 0 && data.list[0].dlink) {
            const file_name = `@gokuthecoder - ` + data.title.replace(/\//g, '');
            const fileUrl = data.list[0].dlink;

            console.log(file_name, fileUrl);

            await axios({
                method: 'get',
                url: fileUrl,
                responseType: 'stream',
                headers: {
                    'User-Agent': 'Mozilla/5.0',
                    "Connection": "keep-alive",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Cookie": process.env.COOKIE,
                },
                maxRedirects: 5,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
            }).then(async function (response) {
                const writer = await fs.createWriteStream(file_name);
                response.data.pipe(writer);

                return new Promise((resolve, reject) => {
                    writer.on('finish', resolve);
                    writer.on('error', reject);
                });
            }).then(() => {
                console.log('Download completed.');
            }).catch((err) => {
                console.error(err);
            });

            const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
            await client.connect();

            const getChannelId = async () => {
                try {
                    const channel = await client.getEntity(channelUsername);
                    const channelId = channel.id;
                    console.log('Channel ID:', channelId);
                    return channelId;
                } catch (error) {
                    console.error('Failed to get channel ID:', error);
                }
            };

            const channelId = await getChannelId();

            const uploadFile = async () => {
                try {
                    const result = await client.sendFile(channelId, {
                        file: "data.js",
                        caption: `\`${file_name}\``,
                    });
                    console.log('File uploaded successfully:', result);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            };

            await uploadFile().then(() => {
                fs.unlinkSync(file_name);
                console.log('File uploaded successfully');
            }).catch((error) => {
                console.error('Error uploading file:', error);
            });
            bot.sendMessage(chatId, `\`${file_name}\`\n\n\`${fileUrl}\``, { parse_mode: 'Markdown' });
        } else {
            throw new Error('Invalid response structure');
        }
    } catch (error) {
        console.error(error);
        bot.sendMessage(chatId, 'An error occurred while fetching the download link. Please try again later.');
    }
});
