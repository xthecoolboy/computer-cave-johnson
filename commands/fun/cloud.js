const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class CloudCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'cloud',
			aliases: [],
			group: 'fun',
			memberName: 'cloud',
			description: 'Lol, u thought.',
			details: oneLine`
				You expected a paycheck. HA!
        As if.
			`,
			examples: ['cloud']
		});
	}

	async run(msg, args) {
		msg.reply(`All hail the Sentient Cloud!`)
	}
};
