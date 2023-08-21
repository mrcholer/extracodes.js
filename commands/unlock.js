const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Unlock a channel'),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has('ManageChannels')) {
      return interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true
      });
    }

    const channel = interaction.channel;
    await channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: null });

    return interaction.reply({
      content: `🔓 This channel has been unlocked.`,
      ephemeral: true
    });
  },
};
