const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete messages')
    .addNumberOption(option =>
      option.setName('count')
        .setDescription('Number of messages to delete (up to 100)')
        .setRequired(false)
    ),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has('ManageMessages')) {
      return interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true
      });
    }

    const count = interaction.options.getInteger('count') || 100;

    if (count <= 0 || count > 100) {
      return interaction.reply({
        content: 'Please enter a valid number between 1 and 100.',
        ephemeral: true
      });
    }

    await interaction.channel.bulkDelete(count, true);

    return interaction.reply({
      content: `Deleted ${count} messages.`,
      ephemeral: true
    });
  },
};
