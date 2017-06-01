const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class AirCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'air',
			aliases: [],
			group: 'fun',
			memberName: 'air',
			description: 'That\'s not going to work.',
			details: oneLine`
				You really think you can get out through the air ducts?
        Cave Johnson thinks not.
			`,
			examples: ['air']
		});
	}

	async run(msg, args) {
		msg.reply(`Attention, test prisoners attempting to escape through the air ducts. I don't know what nonsense you learned on TV, but in real life, air ducts just go to the air conditioning unit. It's also pretty dusty, so if you've got asthma, chances are you're gonna die up there. And we'll be smelling it for weeks because, again, the air ducts aren't a secret escape hatch, they're how we ventilate the facility.`)
	}
};
