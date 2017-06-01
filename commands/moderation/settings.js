const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class SettingsCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      argsPromptLimit: 0,
      name: 'settings',
      aliases: ['set', 'setting'],
      group: 'moderation',
      memberName: 'settings',
      description: 'Sets or shows server settings.',
      details: oneLine `
				This command allows you to set server settings.
        This is required for many comamnds to work.
        Permission is locked to server owner only.
			`,
      examples: ['settings add master Moderators'],

      args: [{
          key: 'action',
          label: 'action',
          type: 'string',
          prompt: '',
          infinite: false
        },
        {
          key: 'setting',
          label: 'setting',
          type: 'string',
          prompt: '',
          infinite: false
        },
        {
          key: 'value',
          label: 'value',
          type: 'string',
          prompt: '',
          infinite: true
        }
      ],

      guildOnly: true,

      guarded: true
    });
  }

  async run(msg, args) {
    if (msg.author !== msg.guild.owner) return msg.reply(':warning: **You do not have permission to use this command!**')
    if (args.action.toLowerCase() === "add") {
      if (args.setting.toLowerCase() === "master") {
        console.log(msg.mentions.roles.first());
        const roleToMaster = msg.mentions.roles.first().id;
        msg.guild.settings.set('masterrole', roleToMaster);
        msg.reply(`Set the Master role to "${msg.guild.settings.get('masterrole')}".`);
      } else if (args.setting.toLowerCase() === "super") {
        console.log(msg.mentions.roles.first());
        const roleToSuper = msg.mentions.roles.first().id;
        msg.guild.settings.set('superrole', roleToSuper);
        const roleToDisp = msg.guild.settings.get('superrole')
        msg.reply(`Set the Super role to "${roleToDisp.name}".`);
      } else if (args.setting.toLowerCase() === "mlogchannel") {
        console.log(msg.mentions.channels.first());
        const chanToLog = msg.mentions.channels.first();
        msg.guild.settings.set('mlogchan', chanToLog);
        msg.reply(`Set the moderation log channel to "#${chanToLog.name}"`)
      } else {
        msg.reply("That's not a setting. ~~I'm going to BURN YOUR HOUSE DOWN WITH THE LEMONS~~ Please try again.");
      }
    } else if (args.action.toLowerCase() === "view") {

    } else {
      msg.reply("Invalid command usage. ~~I'm going to BURN YOUR HOUSE DOWN WITH THE LEMONS~~ Please try again.");
    }
  }
};
