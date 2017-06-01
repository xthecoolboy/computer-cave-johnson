const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class SetupCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'setup',
      aliases: ['serversetup', 'serverprefs'],
      group: 'general',
      memberName: 'setup',
      description: 'Begins the setup process manually.',
      details: oneLine `
				This command takes the server admin through a list of settings to configure.
        This is very useful for customizing how the bot works.
			`,
      examples: ['setup'],
      guildOnly: true,

      args: [
				{
					key: 'continue',
					label: 'continue',
					prompt: 'Are you sure you would like to begin the setup process? (Yes/No)',
					type: 'string',
					infinite: false
				}
			],

      guarded: true
    });
  }

  hasPermission(msg) {
    if (msg.guild) return msg.author.id === '197891949913571329';
    return msg.member.hasPermission('ADMINISTRATOR');
  }

  async run(msg, args) {
    if (args.continue.toLowerCase() === 'no') return
    else if (args.continue.toLowerCase() === 'yes') {
    }
  };
}
