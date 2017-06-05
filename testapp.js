//copy of app.js for testing and maintenance
//one owner, restricted usage, silenced greeting
const commando = require('discord.js-commando');
const bot = new commando.Client({
  owner: ['197891949913571329'],
  commandPrefix: '~'
});
//const defbot = new Discord.Client();
const path = require('path');
const sqlite = require('sqlite')
const oneLine = require('common-tags').oneLine;
const config = require('./config.json');

bot.registry
  .registerGroups([
    ['general', 'General'],
    ['fun', 'Fun'],
    ['moderation', 'Moderation'],
    ['control', 'Bot Owners Only'],
    ['misc', 'Miscellaneous']
  ])

  .registerDefaults()

  .registerCommandsIn(path.join(__dirname, 'commands'));

bot.setProvider(sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new commando.SQLiteProvider(db))).catch(console.error);

bot
  .on('error', () => console.error)
  .on('warn', () => console.warn)
  .on('debug', () => console.log)
  .on('ready', () => {
    console.log(`Client ready; logged in as ${bot.user.tag} (${bot.user.id})`)
    bot.user.setGame('~help | LEMONS!')
    //bot.guilds.map((guild) => guild.defaultChannel.send('It\'s time for SCIENCE, my test subjects!').catch(console.error))
  })
  .on('disconnect', () => console.warn('Disconnected!'))
  .on('reconnecting', () => console.warn('Reconnecting...'))
  .on('commandError', (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on('commandBlocked', (msg, reason) => {
    console.log(oneLine `
			Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
			blocked; ${reason}
		`);
  })
  .on('commandPrefixChange', (guild, prefix) => {
    console.log(oneLine `
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  })
  .on('commandStatusChange', (guild, command, enabled) => {
    console.log(oneLine `
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  })
  .on('groupStatusChange', (guild, group, enabled) => {
    console.log(oneLine `
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
  })
  .on('commandRun', (command, promise, msg, args) => {
    if (msg.guild) {
      console.log(`Command ran
        Guild: ${msg.guild.name} (${msg.guild.id})
        Channel: ${msg.channel.name} (${msg.channel.id})
        User: ${msg.author.tag} (${msg.author.id})
        Command: ${command.groupID}:${command.memberName}
        Message: "${msg.content}"`)
    } else {
      console.log(`Command ran:
        Guild: DM
        Channel: N/A
        User: ${msg.author.tag} (${msg.author.id})
        Command: ${command.groupID}:${command.memberName}
        Message: "${msg.content}"`)
    }
  })
  .on('guildCreate', (guild) => {
    console.log(`New guild added: ${guild.name} (${guild.id}), owned by ${guild.owner.user.tag} (${guild.owner.id}).`)
    guild.defaultChannel.send(`Greetings, friends. I'm Cave Johnson, CEO of Aperture Science - you might know us as a vital participant in the 1968 Senate Hearings on missing astronauts. And you've most likely used one of the many products we invented. But that other people have somehow managed to steal from us. Black Mesa can eat my bankrupt--`)
  })
  .on('message', (msg) => {
    if (msg.author !== bot.user) {
      //console.log(msg.content)
      if (msg.content.toLowerCase().includes('lemon')) return msg.reply(`I’ve been thinking. When life gives you lemons? Don’t make lemonade. Make life take the lemons back! Get mad! I don’t want your damn lemons! What am I supposed to do with these? Demand to see life’s manager! Make life rue the day it thought is could give me lemons! Do you know who I am? I’m the man who’s going to burn your house down! With the lemons! I’m going to get my engineers to invent a combustible lemon that burns your house down!`)
      if (msg.content.toLowerCase().includes('danger')) return msg.reply(`Danger? I like the way you think. You're promoted.`)
      //if (msg.content.includes('test')) return msg.reply('Hi')
    }
  })

bot.login(config.token).catch(console.error);

process.on('unhandledRejection', err => {
  console.error('Uncaught Promise Error: \n' + err.stack);
});
