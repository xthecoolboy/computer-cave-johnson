const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class LemonCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'lemon',
			aliases: [],
			group: 'fun',
			memberName: 'lemon',
			description: 'If life gives you them...',
			details: oneLine`
        Sends Cave Johnson's favorite weapon!
        No, you don't make lemonade, idiot...
			`,
			examples: ['lemon']
		});
	}

	async run(msg, args) {
		msg.channel.send({ files: ['./lemon1.jpg'] })
	}
};
