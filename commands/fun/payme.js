const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class PaymeCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'payme',
			aliases: [],
			group: 'fun',
			memberName: 'payme',
			description: 'Lol, u thought.',
			details: oneLine`
				You expected a paycheck. HA!
        As if.
			`,
			examples: ['payme']
		});
	}

	async run(msg, args) {
		msg.reply(`Your paycheck was attached to Terry's head, which you just blew up.`)
	}
};
