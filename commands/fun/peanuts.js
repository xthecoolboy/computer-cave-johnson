const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class PeanutsCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'peanuts',
			aliases: [],
			group: 'fun',
			memberName: 'peanuts',
			description: 'Better disclose your allergies.',
			details: oneLine`
				It appears the dust ventilator has broken.
        Oh, dear.
			`,
			examples: ['peanuts']
		});
	}

	async run(msg, args) {
		msg.reply(`I sincerely hope you're not allergic to air. Our peanut dust ventilator broke in this wing, so the atmosphere is only 60 percent peanut dust.`)
	}
};
