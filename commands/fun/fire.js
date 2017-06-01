const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class FireCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'fire',
      aliases: [],
      group: 'fun',
      memberName: 'fire',
      description: 'Never question mighty Cave Johnson.',
      details: oneLine `
				Safe science is not the way to go.
        Never question Cave Johnson.
			`,
      examples: ['fire @Bob#1234'],
      args: [{
          key: 'user',
          label: 'user',
          prompt: 'What user would you like to fire? Please specify one only.',
          type: 'member',
          infinite: false
        }
      ]
    });
  }

  async run(msg, args) {
    msg.channel.send(`Science isn't about WHY. It's about WHY NOT. Why is so much of our science dangerous? Why not marry safe science if you love it so much. In fact, why not invent a special safety door that won't hit you on the butt on the way out, because you are fired, ${args.user}.`)
  }
};
