const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to be kicked')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for kicking')
        .setRequired(false)
    ),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has('KickMembers')) {
      return interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true
      });
    }

    const userToKick = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!userToKick) {
      return interaction.reply({
        content: 'Please provide a valid user to kick.',
        ephemeral: true
      });
    }

    const memberToKick = interaction.guild.members.cache.get(userToKick.id);

    if (!memberToKick) {
      return interaction.reply({
        content: 'The specified user is not a member of this server.',
        ephemeral: true
      });
    }

    try {
      await memberToKick.kick(reason);
      return interaction.reply({
        content: `Kicked ${userToKick.tag}. Reason: ${reason}`,
        ephemeral: true
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: 'An error occurred while trying to kick the user.',
        ephemeral: true
      });
    }
  },
};
