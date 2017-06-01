const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class GenderCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'gender',
			aliases: [],
			group: 'fun',
			memberName: 'gender',
			description: 'He\'s not a man!',
			details: oneLine`
				You better not call him a man.
				He\'s got something to say about that.
			`,
			examples: ['gender']
		});
	}

	async run(msg, args) {
		msg.reply(`Cavina Johnson here. It's come to my attention that one of you has sent a letter to the Supreme Council of Matriarchs accusing me of being a man. So, I want to assure both you and Gender Regulatory Committee that I am indeed one hundred percent all woman.`)
	}
};
