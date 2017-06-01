const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class PruneCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'prune',
      aliases: ['clearuser', 'pruneuser'],
      group: 'moderation',
      memberName: 'prune',
      description: 'Prunes messages from a specified user.',
      details: oneLine `
				This command prunes messages from a specified user.
        This is useful if someone has been spamming.
        Permission is locked to members with the master role.
			`,
      examples: ['prune @Bob#1234 100'],
      args: [{
          key: 'user',
          label: 'user',
          prompt: 'What user would you like to prune? Please specify one only.',
          type: 'member',
          infinite: false
        },
        {
          key: 'amount',
          label: 'amount',
          prompt: 'How many messages would you like to prune? (Max is 100)',
          type: 'float',
          infinite: false
        }
      ],

      guildOnly: true,

      guarded: true
    });
  }

  async run(msg, args) {
    if (!this.client.isOwner(msg.author)) {
      let allowed = msg.guild.settings.get('masterrole')
      let allowed2 = msg.guild.settings.get('superrole')
      if (!allowed) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
      if (!allowed2) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
      if (!msg.member.roles.has(allowed)) {
        if (!msg.member.roles.has(allowed2)) return msg.reply(':warning: **You do not have permission to use this command!**')
      }
    }

    let messagecount = args.amount
    msg.channel.fetchMessages({
        limit: 100
      })
      .then(messages => {
        let msg_array = messages.array()
        msg_array = msg_array.filter(m => m.author.id === args.user.id)
        msg_array.length = messagecount + 1
        Promise.all(msg_array.map(m => m.delete()))
          .then(crap => {
            msg.reply(`:white_check_mark: **Pruned ${args.amount} messages from ${args.user}.**`)
              .then(msg => {
                setTimeout(del, 5000)

                function del() {
                  msg.delete(1)
                }
              })
          })
      })
  }
};
