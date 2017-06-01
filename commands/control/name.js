const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class CloudCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'name',
      aliases: ['setname', 'username', 'setusername'],
      group: 'control',
      memberName: 'name',
      description: 'Sets the bot\'s username.',
      details: oneLine `
				This command changes the bot's username.
        If, of course, you want to deface poor Cave Johnson.
        Discord only allows this twice every hour. Use sparingly!
			`,
      examples: ['name Cave Johnson'],
      args: [{
        key: 'name',
        label: 'name',
        prompt: 'What would you like to name the bot?',
        type: 'string',
        infinite: false
      }],
      throttling: {usages: 2, duration: 3600},

      guarded: true
    })
  }

  async run(msg, args) {
    if (!this.client.isOwner(msg.author)) return msg.reply(':warning: **You do not have permission to use this command!**')
    const toName = args.name
    this.client.user.setUsername(args.name)
    msg.reply(`Set the bot's name to "${toName}"`)
  }
};
