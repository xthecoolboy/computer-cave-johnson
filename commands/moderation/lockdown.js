const commando = require('discord.js-commando')
const oneLine = require('common-tags').oneLine
const ms = require('ms')

module.exports = class LockdownCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'lockdown',
      aliases: ['ld'],
      group: 'moderation',
      memberName: 'lockdown',
      description: 'Locks down the current channel.',
      details: oneLine `
				This command locks the current channel.
        This is useful for if a large amount of people need to chill.
        Permission is locked to members with the super role.
			`,
      examples: ['lockdown'],

      guildOnly: true,

      guarded: true
    })
  }

  async run(msg, args) {
    if (!this.client.isOwner(msg.author)) {
      let allowed = msg.guild.settings.get('superrole')
      if (!allowed) return msg.reply(':warning: **This command is not set up to work!** Have your server owner run the setup command.')
      if (!msg.member.roles.has(allowed)) return msg.reply(':warning: **You do not have permission to use this command!**')
    }

    if (!this.lockit) this.lockit = []
    let argsList = msg.content.split(' ').slice(1);
    let time = argsList.join(' ')
    let validUnlocks = ['release', 'unlock']
    if (!time) return msg.reply('You must set a duration for the lockdown in either hours, minutes or seconds')

    if (validUnlocks.includes(time)) {
      msg.channel.overwritePermissions(msg.guild.id, {
        SEND_MESSAGES: null
      }).then(() => {
        msg.channel.send(':loud_sound: **Lockdown lifted.**')
        clearTimeout(this.lockit[msg.channel.id])
        delete this.lockit[msg.channel.id]
      }).catch(error => {
        console.log(error)
      })
    } else {
      let count = 0
      let count2 = 0
      //console.log(`first ${count2}`)
      msg.guild.roles.map((role) => {
        msg.channel.overwritePermissions(role.id, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          })
          .then(async() => {
            //console.log(count)
            //console.log(`second ${count2}`)
            if (count === 0) {
              count++
              //console.log(count)
              await msg.channel.send(`:mute: **Channel locked down for ${ms(ms(time), { long:true })}** (Do \`${msg.guild.commandPrefix}lockdown unlock\` to unlock.)`).then(() => {
                this.lockit[msg.channel.id] = setTimeout(() => {
                  //console.log(`third ${count2}`)
                  msg.guild.roles.map((role) => {
                    msg.channel.overwritePermissions(role.id, {
                      SEND_MESSAGES: null,
                      ADD_REACTIONS: null
                    }).then(async() => {
                      if (count2 === 0) {
                        count2++
                        await msg.channel.send(':loud_sound: **Lockdown lifted.**')
                      }
                    })
                    delete this.lockit[msg.channel.id]
                  }, ms(time))
                })

              }).catch(error => {
                console.log(error)
              })
            }
          })
      })
    }
  }
};
