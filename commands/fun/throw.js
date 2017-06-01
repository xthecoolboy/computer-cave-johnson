const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class ThrowCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'throw',
      aliases: [],
      group: 'fun',
      memberName: 'throw',
      description: 'Makes good use of the lemons',
      details: oneLine `
				He wanted 'em, now he has 'em!
        Why not put 'em to use?
			`,
      examples: ['throw @Bob#1234'],
      args: [{
        key: 'user',
        label: 'user',
        prompt: 'What user would you like to throw at? Please specify one only.',
        type: 'member',
        infinite: false
      }]
    });
  }

  async run(msg, args) {
    msg.channel.send(`*throws a combustible lemon at ${args.user}*`)
    msg.channel.send({ files: ['./lemon1.jpg'] })
    setTimeout(combust, 250)

    function combust() {
      msg.channel.send('*lemon combusts*')
      msg.channel.send({ files: ['./lemon2.png'] })
    }
  }
};
