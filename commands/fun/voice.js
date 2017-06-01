const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const ytdl = require('ytdl-core');

module.exports = class CloudCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'voice',
      aliases: [],
      group: 'fun',
      memberName: 'voice',
      description: 'Now he\'s REALLY got something to say!',
      details: oneLine `
				Tired of all that text channel crap?
        Well now you can actually HEAR what Cave Johnson has to say!
			`,
      examples: ['voice play'],
      guildOnly: true,
      args: [{
        key: 'action',
        label: 'action',
        prompt: 'What action would you like to perform? (Play, pause, resume, stop, volume)',
        type: 'string',
        infinite: false
      },
      {
        key: 'volume',
        label: 'volume',
        prompt: '',
        default: '0',
        type: 'integer',
        infinite: false
      }]
    })
  }

  async run(msg, args) {
    if (args.action === 'play') {
      const voiceChannel = msg.member.voiceChannel
      if (!voiceChannel) return msg.reply(':warning: **Please be in a voice channel first!**')
      msg.reply(':white_check_mark: **Playing...**')
      voiceChannel.join()
        .then(connection => {
          let toPlay = [`https://www.youtube.com/watch?v=CeJ1Sauv2gc`, `https://www.youtube.com/watch?v=zQjC9Ds3bBM`]
          const stream = ytdl(toPlay[Math.floor(Math.random() * toPlay.length)], {
            filter: 'audioonly'
          })
          const dispatcher = connection.playStream(stream)
          dispatcher.setVolumeLogarithmic(25 / 100)
          dispatcher.on('end', () => {
            voiceChannel.leave()
            msg.reply(':white_check_mark: **Finished playing.**')
          })
        })
    } else if (args.action === 'pause') {
      const dispatcher = msg.guild.voiceConnection.dispatcher
      msg.channel.send(':white_check_mark: **Audio paused.**').then(() => {
        dispatcher.pause();
      })
    } else if (args.action === 'resume') {
      const dispatcher = msg.guild.voiceConnection.dispatcher
      msg.channel.send(':white_check_mark: **Audio resumed.**').then(() => {
        dispatcher.resume();
      })
    } else if (args.action === 'stop' || args.action === 'end') {
      const dispatcher = msg.guild.voiceConnection.dispatcher
      msg.channel.send(':white_check_mark: **Audio stopped.**').then(() => {
        dispatcher.end();
        msg.member.voiceChannel.leave()
      })
    } else if (args.action === 'volume') {
      const dispatcher = msg.guild.voiceConnection.dispatcher
      let volume = args.volume
      console.log(volume)
      msg.channel.send(`:white_check_mark: **Volume: ${volume}%**`).then(() => {
        dispatcher.setVolumeLogarithmic(volume / 100)
      }).catch(console.error)
    }
  }
};
