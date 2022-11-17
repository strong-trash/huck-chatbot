const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
    ]});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})


// 봇과 서버를 연결해주는 부분
client.login('MTA0Mjg5Mjg5MDY2MzI5NzAzNQ.GQRBAI.UqBb3YpkqKgL8U4x1iQdGKYAV5vydkOIMVjvE0');