const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('help commands')
    .setDMPermission(false),
	async execute(interaction, client) {
    interaction.reply({
      content:"this is a help :)"
    })
	},
};
