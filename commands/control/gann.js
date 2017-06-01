const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class GAnnCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'gann',
			aliases: ['globalannounce', 'gsay', 'shout', 'gshout', 'tellall'],
			group: 'control',
			memberName: 'gann',
			description: 'Sends a global announcement.',
			details: oneLine`
				This command sends an announcement to all servers.
        Permission locked to bot owners for security reasons.
			`,
			examples: ['gann Hello'],

			args: [
				{
					key: 'msg',
					label: 'msg',
					prompt: 'What would you like to announce?',
					type: 'string',
					infinite: false
				}
			],

			guarded: true
		});
	}

	async run(msg, args) {
    if (!this.client.isOwner(msg.author)) return msg.reply(':warning: **You do not have permission to use this command!**')
		if (msg.author.id === '197891949913571329') {
			let toSay = `${args.msg}
~TJ, Head Developer & Systems Administrator`
			this.client.guilds.map((guild) => guild.defaultChannel.send(toSay))
    	msg.reply(`Execution completed. Shouted "${toSay}"`)
		} else if (msg.author.id === '154104023413161984') {
			let toSay = `${args.msg}
~Aly :0), Co-Founder and CEO`
			this.client.guilds.map((guild) => guild.defaultChannel.send(toSay))
    	msg.reply(`Execution completed. Shouted "${toSay}"`)
		} else if (msg.author.id === '247318700414205952') {
			let toSay = `${args.msg}
~Lizzy, Co-Founder, CEO, and Head Writer`
			this.client.guilds.map((guild) => guild.defaultChannel.send(toSay))
    	msg.reply(`Execution completed. Shouted "${toSay}"`)
		} else {
			this.client.guilds.map((guild) => guild.defaultChannel.send(args.msg))
    	msg.reply(`Execution completed. Shouted "${args.msg}"`)
		}
	}
};
