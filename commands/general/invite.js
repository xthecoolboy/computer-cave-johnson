const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class InviteCommand extends commando.Command {
	constructor(bot) {
		super(bot, {
			name: 'invite',
			aliases: [],
			group: 'general',
			memberName: 'invite',
			description: 'Sends a link to add the bot.',
			details: oneLine`
				Do you want Cave Johnson in your server?
        Of course you do! He's amazing!
        This command sends an invite you can use to have him for yourself.
			`,
			examples: ['invite'],

      guarded: true
		});
	}

	async run(msg, args) {
		msg.reply('To add me to your server, click this link! https://discordapp.com/oauth2/authorize?permissions=372632775&scope=bot&client_id=294211466352001027')
	}
};
