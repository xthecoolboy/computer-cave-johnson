const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ListGuildsCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'listguilds',
      aliases: ['listservers', 'guilds', 'servers', 'listallguilds', 'listallservers'],
      group: 'control',
      memberName: 'listguilds',
      description: 'Lists information about all the servers the bot is in.',
      details: oneLine `
				This command provides a list of information for each server the bot is in.
        This can be helpful if a certain server is needing help or causing issues.
        Usage is restricted to bot owners.
			`,
      examples: ['listguilds'],

      guarded: true
    });
  }

  async run(msg, args) {
    if (!this.client.isOwner(msg.author)) return msg.reply(':warning: **You do not have permission to use this command!**')
    this.client.guilds.map((guild) => {
      msg.channel.send(`Guild: ${guild.id}
Name: ${guild.name}
Owner: ${guild.owner.user.tag} (${guild.owner.id})
Default Channel: #${guild.defaultChannel.name} (${guild.defaultChannel.id})
Members: ${guild.members.size}`)
    })
  }
};
