const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('timeout')
    .setDescription('Timeout a member from chatting')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('User to be timed out')
        .setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName('duration')
        .setDescription('Duration of the timeout in minutes')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the timeout')
        .setRequired(false)
    ),
  async execute(interaction, client) {
    if (!interaction.member.permissions.has('Manage_Messages')) {
      return interaction.reply({
        content: "You don't have permission to use this command.",
        ephemeral: true
      });
    }

    const userToTimeout = interaction.options.getUser('user');
    const durationInMinutes = interaction.options.getInteger('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!userToTimeout) {
      return interaction.reply({
        content: 'Please provide a valid user to timeout.',
        ephemeral: true
      });
    }

    if (durationInMinutes <= 0) {
      return interaction.reply({
        content: 'Please provide a valid positive duration in minutes.',
        ephemeral: true
      });
    }

    const memberToTimeout = interaction.guild.members.cache.get(userToTimeout.id);

    if (!memberToTimeout) {
      return interaction.reply({
        content: 'The specified user is not a member of this server.',
        ephemeral: true
      });
    }

    const timeoutRole = interaction.guild.roles.cache.find(role => role.name === 'Timeout');

    if (!timeoutRole) {
      return interaction.reply({
        content: 'Timeout role not found. Please create a role named "Timeout".',
        ephemeral: true
      });
    }

    try {
      await memberToTimeout.roles.add(timeoutRole);
      setTimeout(async () => {
        await memberToTimeout.roles.remove(timeoutRole);
      }, durationInMinutes * 60 * 1000);

      return interaction.reply({
        content: `Timed out ${userToTimeout.tag} for ${durationInMinutes} minutes. Reason: ${reason}`,
        ephemeral: true
      });
    } catch (error) {
      console.error(error);
      return interaction.reply({
        content: 'An error occurred while trying to timeout the user.',
        ephemeral: true
      });
    }
  },
};
