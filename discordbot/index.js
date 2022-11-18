const { Client,Events,Collection ,GatewayIntentBits } = require("discord.js");
const config = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
    ]});

client.commands = new Collection();

// 파일 위치
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}




// 작동 기능들

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`)

})

client.on('messageCreate', async (message) => {
    const randomhuck = Math.floor(Math.random() * 5 );
    const huckarray = ["헉","허억","허허억","헉헉","헐"]
    console.log("on message is : ", message.content);
    if (message.content.startsWith('!reply')) {
        message.channel.send(`${huckarray[randomhuck]}`);
        //message.reply("헉");
      }
  });


  client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});



// 봇과 서버를 연결해주는 부분
// 자기 토큰을 넣어야 한다.
client.login(config.token);