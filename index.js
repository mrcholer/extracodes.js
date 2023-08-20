const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');

const bot = {
  token: "token",
  clientId: "botId",
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log("Connected to " + client.user.tag);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: 'I dont have permissions', ephemeral: true })
  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.log(error)
  }
});

const commands = [];

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(bot.token);

rest.put(Routes.applicationCommands(bot.clientId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);

client.login(bot.token);
