const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ServerCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'server',
			aliases: [],
			group: 'general',
			memberName: 'server',
			description: 'Sends an invite to the official server.',
			details: oneLine`
				Need help with a bot issue?
        Want to suggest a new feature?
        Just want to say hi to the development and writing teams?
        The Aperture Science server is the server for you!
			`,
			examples: ['server'],

      guarded: true
		});
	}

	async run(msg, args) {
		msg.reply('Come visit Aperture Science, Test Subjects! https://discord.gg/wbAMyff')
	}
};
