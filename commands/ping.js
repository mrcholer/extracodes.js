const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping Pong')
    .setDMPermission(false),
	async execute(interaction, client) {
    interaction.reply({
      content:"Ping pong!"
    })
	},
};
