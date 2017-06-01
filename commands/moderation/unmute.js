const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class UnmuteCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'unmute',
      aliases: ['turnon', 'on'],
      group: 'moderation',
      memberName: 'unmute',
      description: 'Re-enables a user\'s ability to talk.',
      details: oneLine `
      This command unmutes a specified user from text and voice chat.
      This is for if a user's mute was either too long or permanent.
      Permission is locked to members with the master role.
			`,
      guildOnly: true,
      examples: ['unmute @Bob#1234'],

      args: [{
        key: 'user',
        label: 'user',
        prompt: 'What user would you like to unmute? Please specify one only.',
        type: 'member',
        infinite: false
      }],

      guarded: true
    });
  }

  async run(msg, args) {
    let errcount = 0
    let toUnmute = args.user.user
    if (!this.client.isOwner(msg.author)) {
      let allowed = msg.guild.settings.get('masterrole')
      let allowed2 = msg.guild.settings.get('superrole')
      if (!allowed) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
      if (!allowed2) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
      if (!msg.member.roles.has(allowed)) {
        if (!msg.member.roles.has(allowed2)) return msg.reply(':warning: **You do not have permission to use this command!**')
      }
    }
    console.log(msg.channel.permissionsFor(toUnmute))
    if (msg.channel.permissionsFor(toUnmute).has('SEND_MESSAGES')) return msg.channel.send(`:warning: **${args.user} is already unmuted!**`)
    msg.guild.channels.map((channel) => {
      channel.overwritePermissions(args.user, {
          SEND_MESSAGES: true,
          ADD_REACTIONS: true,
          SPEAK: true
        })
        .then(() => console.log('User unmuted per 1 channel.'))
        .catch(err => {
          if (errcount === 0) {
            msg.reply(':warning: **Failed to unmute in one or more channels.** Please unmute manually or give me administrator permission and try again.')
            errcount++
          } else return console.log(`errcount === ${errcount}`)
        });
    });
    msg.channel.send(`:white_check_mark::loud_sound: **${args.user} has been unmuted.**`)
  }
}
