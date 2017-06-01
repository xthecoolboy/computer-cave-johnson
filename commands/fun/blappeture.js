const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class BlappetureCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'blappeture',
			aliases: [],
			group: 'fun',
			memberName: 'blappeture',
			description: 'He bought \'em!',
			details: oneLine`
				Cave Johnson has just bought Black Mesa and became the new owner and CEO!
        This command lets you know what he has to say about that.
			`,
			examples: ['blappeture']
		});
	}

	async run(msg, args) {
		msg.reply(`Cave Johnson, new owner and CEO of Black Mesa. That's right, you've been bought. First order of business, we're renaming you under the Aperture brand. I'm leaning towards Blappeture Mesa. Marketing boys think something else. So: Blappeture it is. Next, they tell me you people are conducting some anomalous materials research that could result in a resonance cascade. So I'm shutting that down before you idiots end the world. A resonance cascade! You're supposed to be scientists. Use some common sense.`)
	}
};
