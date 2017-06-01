const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class SoftbanCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'softban',
      aliases: ['gentleban', 'gentlyban', 'silentban'],
      group: 'moderation',
      memberName: 'softban',
      description: 'Softbans a specified user.',
      details: oneLine `
				This command softbans a user.
        A softban will ban the user, remove 7 days worth of their messages, and unban them.
        Permission is locked to members with the super role.
			`,
      examples: ['softban @Bob#1234 7 Being a butt'],
      args: [{
          key: 'user',
          label: 'user',
          prompt: 'What user would you like to softban? Please specify one only.',
          type: 'member',
          infinite: false
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: 'Why is the user being softbanned?',
          type: 'string',
          infinite: false
        },
      ],

      guildOnly: true,

      guarded: true
    });
  }

  async run(msg, args) {
    let allowed = msg.guild.settings.get('superrole')
    if (!allowed) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
    if (!msg.member.roles.has(allowed)) return msg.reply(':warning: **You do not have permission to use this command!**')


    if (!msg.guild.member(this.client.user).hasPermission('BAN_MEMBERS')) return msg.reply(':warning: **I do not have permission to ban members!**')

    await args.user.send(`You have been softbanned from the server '${msg.guild}'!
Staff member: ${msg.author.username}
Reason: '${args.reason}'`)

    msg.guild.ban(args.user, {
      days: 7,
      reason: `SOFTBAN: ${args.reason}`
    })

    msg.guild.unban(args.user)
  }
};
