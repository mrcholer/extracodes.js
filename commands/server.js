const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Get information about the server'),
  async execute(interaction, client) {
    const guild = interaction.guild;

    const rolesCount = guild.roles.cache.size;
    const channelsCount = guild.channels.cache.size;
    const membersCount = guild.memberCount;
    const boostsCount = guild.premiumSubscriptionCount;
    const owner = guild.owner.user.tag;
    const createdTimestamp = guild.createdTimestamp;
    const createdDate = new Date(createdTimestamp).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });

    const embed = {
      title: 'Server Information',
      description: `**Name:** ${guild.name}
      **Roles Count:** ${rolesCount}
      **Channels Count:** ${channelsCount}
      **Members Count:** ${membersCount}
      **Boosts Count:** ${boostsCount}
      **Server Owner:** ${owner}
      **Created:** ${createdDate}`,
      color: 0x00ff00,
      timestamp: new Date(),
      footer: {
        text: 'Server Info'
      }
    };

    return interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  },
};
