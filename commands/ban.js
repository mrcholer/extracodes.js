const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a member')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to be banned')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for banning')
        .setRequired(false)
    ),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has('BanMembers')) {
      return interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true
      });
    }

    const userToBan = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!userToBan) {
      return interaction.reply({
        content: 'Please provide a valid user to ban.',
        ephemeral: true
      });
    }

    try {
      await interaction.guild.members.ban(userToBan, { reason });
      return interaction.reply({
        content: `Banned ${userToBan.tag}. Reason: ${reason}`,
        ephemeral: true
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: 'An error occurred while trying to ban the user.',
        ephemeral: true
      });
    }
  },
};
