const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const Discord = require('discord.js');

module.exports = class WarnCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'warn',
      aliases: ['nono', 'reprimand'],
      group: 'moderation',
      memberName: 'warn',
      description: 'Kicks a specified user.',
      details: oneLine `
				This command warns a user.
        The warning will be added to their log and can be checked later.
        Permission is locked to members with the master role.
			`,
      examples: ['warn @Bob#1234 Being a butt'],
      args: [{
          key: 'user',
          label: 'user',
          prompt: 'What user would you like to warn? Please specify one only.',
          type: 'member',
          infinite: false
        },
        {
          key: 'reason',
          label: 'reason',
          prompt: 'Why is the user being warned?',
          type: 'string',
          infinite: false
        },
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

    await args.user.send(`You have been warned in the server '${msg.guild}'!
Staff member: ${msg.author.tag}
Reason: '${args.reason}'`)

    let warnMember = args.user.id

    const embed = new Discord.RichEmbed()
      .setTitle(':bangbang: Warning :bangbang:')
      .setColor(0xffcc00)
      .setAuthor(this.client.users.get(warnMember).tag, this.client.users.get(warnMember).avatarURL)
      .setDescription(`User: ${args.user}
Moderator: ${msg.author}
Reason: ${args.reason}`)
      .setTimestamp()
    msg.channel.send({ embed: embed })
  }
};
