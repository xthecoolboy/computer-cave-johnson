const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class MuteCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'mute',
      aliases: ['silence', 'turnoff', 'off', 'stfu'],
      group: 'moderation',
      memberName: 'mute',
      description: 'Disables a user\'s ability to talk.',
      details: oneLine `
				This command mutes a specified user from text and voice chat.
        This is a great command for if a kick is not needed.
        Permission is locked to members with the master role.
			`,
      guildOnly: true,
      examples: ['mute @Bob#1234 5 being a butt'],

      args: [{
          key: 'user',
          label: 'user',
          prompt: 'What user would you like to mute? Please specify one only.',
          type: 'member',
          infinite: false
        },
        {
          key: 'time',
          label: 'time',
          prompt: 'How long would you like to mute the user for? (Time is in mintues)',
          type: 'float',
          infinite: false
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: '',
          default: '[The moderator gave no reason.]',
          type: 'string',
          infinite: false
        }
      ],

      guarded: true
    });
  }

  async run(msg, args) {
    let errcount = 0
    let errcount2 = 0
    if (!this.client.isOwner(msg.author)) {
      let allowed = msg.guild.settings.get('masterrole')
      let allowed2 = msg.guild.settings.get('superrole')
      if (!allowed) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
      if (!allowed2) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
      if (!msg.member.roles.has(allowed)) {
        if (!msg.member.roles.has(allowed2)) return msg.reply(':warning: **You do not have permission to use this command!**')
      }
    }
    msg.guild.channels.map((channel) => {
      channel.overwritePermissions(args.user, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        })
        .then(() => console.log('Done per 1 channel.'))
        .catch(err => {
          if (errcount === 0) {
            msg.reply(':warning: **Failed to mute in one or more channels.** Please mute manually or give me administrator permission and try again.')
            errcount++
          } else return console.log(`errcount === ${errcount}`)
        });
    });

    msg.channel.send(`:white_check_mark: **${args.user} has been muted for ${args.time} minutes.** Use \`${msg.guild.commandPrefix}unmute\` to unmute before time is over.`)
    let time = args.time * 1000 * 60
    console.log(`time = ${time}`)
    setTimeout(unMute, time)

    function unMute() {
      let toUnmute = args.user.user
      if (msg.channel.permissionsFor(toUnmute).has('SEND_MESSAGES')) return //msg.channel.send(`:warning: **${args.user} is already unmuted!**`)
      msg.guild.channels.map((channel) => {
        channel.overwritePermissions(args.user, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true,
            SPEAK: true
          })
          .then(() => console.log('Time elapsed, user unmuted per 1 channel.'))
          .catch(err => {
            if (errcount2 === 0) {
              msg.reply(':warning: **Failed to unmute in one or more channels.** Please unmute manually or give me administrator permission and try again.')
              errcount2++
            } else return console.log(`errcount2 === ${errcount2}`)
          });
      });
      alert()
    }

    function alert() {
      msg.channel.send(`:loud_sound: ${args.user} has been unmuted.`)
    }
  }
};
