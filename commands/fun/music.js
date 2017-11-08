const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
//const ytdl = require('ytdl-core');
//const YouTube = require('simple-youtube-api');
//const config = require('./config.json');
//const yt = new YouTube(config.youtubeAPIKey);

module.exports = class MusicCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'music',
      aliases: [],
      group: 'fun',
      memberName: 'music',
      description: '***BROKEN:  *** Plays requested music',
      details: oneLine `
				Plays requested music.
        This is currently disabled due to a memory leak.
        The problem is being investigated and fixed.
			`,
      examples: ['music play the bee movie'],
      args: [{
          key: 'action',
          label: 'action',
          prompt: 'What action would you like to perform? (Play, pause, resume, stop, volume)',
          type: 'string',
          infinite: false
        },
        {
          key: 'song',
          label: 'song',
          prompt: '',
          default: 'all star by smash mouth',
          type: 'string',
          infinite: false
        }
      ]
    });
  }

  async run(msg, args) {
		msg.reply('This command is broken. Maintenance is planned.')
    /*if (args.action === 'play') {
      const connections = new Map()
      connections.set(msg.guild.id, {
        queue: []
      })
      msg.guild.settings.remove('Requester')
      const requester = msg.author
      msg.guild.settings.set('Requester', requester)
      this.requester = msg.guild.settings.get('Requester')
      const voiceChannel = msg.member.voiceChannel
      if (!voiceChannel) return msg.reply(':warning: **Please be in a voice channel first!**')
      const serverConnection = connections.get(msg.guild.id)
      if (serverConnection.queue.length < 1) {
        msg.reply(':white_check_mark: **Playing...**')

        serverConnection.queue.push(args.song)
        console.log(serverConnection.queue[0])

        function play() {
          voiceChannel.join()
            .then(connection => {
              yt.searchVideos(serverConnection.queue[0], 1)
                .then(async results => {
                  let toPlay = await yt.getVideoByID(results[0].id)
                  console.log(toPlay.id)
                  const stream = ytdl(toPlay.id, {
                    filter: 'audioonly'
                  })
                  const dispatcher = connection.playStream(stream)
                  dispatcher.setVolumeLogarithmic(25 / 100)
                  dispatcher.on('end', () => {
                    const nextToPlay = serverConnection.queue.shift()
                    if (nextToPlay !== undefined) {
                      play()
                    }
                    voiceChannel.leave()
                    msg.reply(':white_check_mark: **Finished playing.**')
                  })
                })
            })
        }
        play()
      } else {
        serverConnection.queue.push(args.song)
        msg.reply(':white_check_mark: **Added song to queue.**')
      }
    } else if (args.action === 'pause') {
      if (msg.author !== this.requester) return msg.reply(':warning: **You did not request this song!**')
      const dispatcher = msg.guild.voiceConnection.dispatcher
      msg.channel.send(':white_check_mark: **Audio paused.**').then(() => {
        dispatcher.pause();
      })
    } else if (args.action === 'resume') {
      if (msg.author !== this.requester) return msg.reply(':warning: **You did not request this song!**')
      const dispatcher = msg.guild.voiceConnection.dispatcher
      msg.channel.send(':white_check_mark: **Audio resumed.**').then(() => {
        dispatcher.resume();
      })
    } else if (args.action === 'stop' || args.action === 'end') {
      if (msg.author !== this.requester) return msg.reply(':warning: **You did not request this song!**')
      const dispatcher = msg.guild.voiceConnection.dispatcher
      msg.channel.send(':white_check_mark: **Audio stopped.**').then(() => {
        dispatcher.end();
        msg.member.voiceChannel.leave()
      })
    } else if (args.action === 'volume') {
      if (msg.author !== this.requester) return msg.reply(':warning: **You did not request this song!**')
      const dispatcher = msg.guild.voiceConnection.dispatcher
      let volume = msg.content.split(' ').slice(2)
      if (volume > 200) {
        volume = 200
      } else if (volume < 1) {
        volume = 1
      }
      console.log(volume)
      msg.channel.send(`:white_check_mark: **Volume: ${volume}%**`).then(() => {
        dispatcher.setVolumeLogarithmic(volume / 100)
      }).catch(console.error)
    }*/
  }
};

process.on('unhandledRejection', err => console.error(`Uncaught Promise Error: \n${err.stack}`));
