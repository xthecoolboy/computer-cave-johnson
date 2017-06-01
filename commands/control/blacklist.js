const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class BlacklistCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'blacklist',
      aliases: ['block', 'abl', 'deny', 'restrict'],
      group: 'control',
      memberName: 'blacklist',
      description: 'Adds numbers together.',
      details: oneLine `
				This command disables usage of the bot to a certain server or user.
        This is helpful if someone is eating up resources with spam.
        Usage is restricted to bot owners.
        (Use in conjunction with \`listguilds\`.)
			`,
      examples: ['blacklist guild 1234567890'],

      args: [{
          key: 'type',
          label: 'tpye',
          prompt: 'What are you blacklisting? (Server or User)',
          type: 'string',
          infinite: false
        },
        {
          key: 'id',
          label: 'id',
          prompt: 'What is the ID of the thing to be blackisted? (Check logs for users or \`listguilds\`)',
          type: 'string',
          infinite: false
        }
      ],

      guarded: true
    });
  }

  async run(msg, args) {
		if (args.type.toLowerCase() === 'server') {
      var blackServers = []
      blackServers.push(args.id)
      msg.reply(`:white_check_mark: **Blacklisted "${this.client.guilds.get(args.id).name}" (${this.client.guilds.get(args.id).id})**`)
    } else if (args.type.toLowerCase() === 'user') {

    } else {
      msg.reply(':warning: **Invalid type.**')
    }
  }
};
