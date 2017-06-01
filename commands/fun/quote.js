const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class CloudCommand extends commando.Command {
  constructor(bot) {
    super(bot, {
      name: 'quote',
      aliases: ['prerecordedmessages', 'prerecorded', 'pre-recordedmessages'],
      group: 'fun',
      memberName: 'quote',
      description: 'Boy, he\'s really got something to say this time.',
      details: oneLine `
				Cave Johnson has a lot of pre-recorded messages.
        I guess you could call this the pre-recorded messages command.
			`,
      examples: ['quote']
    });
  }

  async run(msg, args) {
    let quotes = [`Welcome, gentlemen, to Aperture Science. Astronauts, war heroes, Olympians--you're here because we want the best, and you are it. So: Who is ready to make some science?`,
      `Now, you already met one another on the limo ride over, so let me introduce myself.`,
      `I'm Cave Johnson. I own the place.`,
      `That eager voice you heard is the lovely Caroline, my assistant. Rest assured, she has transferred your honorarium to the charitable organization of your choice. Isn't that right, Caroline?`,
      `She's the backbone of this facility. Pretty as a postcard, too. Sorry, fellas. She's married. To science.`,
      `There's a thousand tests performed every day here in our enrichment spheres. I can't personally oversee every one of them, so these pre-recorded messages'll cover any questions you might have, and respond to any incidents that may occur in the course of your science adventure.`,
      `Your test assignment will vary, depending on the manner in which you have bent the world to your will.`,
      `Those of you helping us test the repulsion gel today, just follow the blue line on the floor.`,
      `Those of you who volunteered to be injected with praying mantis DNA, I've got some good news and some bad news.`,
      `Bad news is we're postponing those tests indefinitely. Good news is we've got a much better test for you: fighting an army of mantis men. Pick up a rifle and follow the yellow line. You'll know when the test starts.`,
      `They say great science is built on the shoulders of giants. Not here. At Aperture, we do all our science from scratch. No hand holding.`,
      `Alright, let's get started. This first test involves something the lab boys call 'repulsion gel.'`,
      `You're not part of the control group, by the way. You get the gel. Last poor son of a gun got blue paint. Hahaha. All joking aside, that did happen - broke every bone in his legs. Tragic. But informative. Or so I'm told.`,
      `The lab boys just informed me that I should not have mentioned the control group. They're telling me I oughtta stop making these pre-recorded messages. That gave me an idea: make more pre-recorded messages. I pay the bills here, I can talk about the control group all damn day.`,
      `For this next test, we put nanoparticles in the gel. In layman's terms, that's a billion little gizmos that are gonna travel into your bloodstream and pump experimental genes and RNA molecules and so forth into your tumors.`,
      `Now, maybe you don't have any tumors. Well, don't worry. If you sat on a folding chair in the lobby and weren't wearing lead underpants, we took care of that too.`,
      `Oh, in case you got covered in that repulsion gel, here's some advice the lab boys gave me: DO NOT get covered in the repulsion gel.`,
      `We haven't entirely nailed down what element it is yet, but I'll tell you this: it's a lively one, and it does NOT like the human skeleton.`,
      `All these science spheres are made of asbestos, by the way. Keeps out the rats. Let us know if you feel a shortness of breath, a persistent dry cough or your heart stopping. Because that's not part of the test. That's asbestos.`,
      `Good news is, the lab boys say the symptoms of asbestos poisoning show a median latency of forty-four point six years, so if you're thirty or older, you're laughing. Worst case scenario, you miss out on a few rounds of canasta, plus you forwarded the cause of science by three centuries. I punch those numbers into my calculator, it makes a happy face.`,
      `Ha! I like your style. You make up your own rules, just like me.`,
      `Bean counters said I couldn't fire a man just for being in a wheelchair. Did it anyway. Ramps are expensive.`,
      `Just a heads-up: That coffee we gave you earlier had fluorescent calcium in it so we can track the neuronal activity in your brain. There's a slight chance the calcium could harden and vitrify your frontal lobe. Anyway, don't stress yourself thinking about it. I'm serious. Visualizing the scenario while under stress actually triggers the reaction.`,
      `Now, if you're part of Control Group Kepler-Seven, we implanted a tiny microchip about the size of a postcard into your skull. Most likely you've forgotten it's even there, but if it starts vibrating and beeping during this next test, let us know, because that means it's about to hit five hundred degrees, so we're gonna need to go ahead and get that out of you pretty fast.`,
      `I'm telling 'em, keep your pants on.`,
      `Alright, this next test may involve trace amounts of time travel. So, word of advice: If you meet yourself on the testing track, don't make eye contact. Lab boys tell me that'll wipe out time. Entirely. Forward and backward! So do both of yourselves a favor and just let that handsome devil go about his business.`,
      `If you're hearing this, it means you're taking a long time on the catwalks between tests. The lab boys say that might be a fear reaction.`,
      `I'm no psychiatrist, but coming from a bunch of eggheads who wouldn't recognize the thrill of danger if it walked up and snapped their little pink bras, that sounds like 'projection'.`,
      `THEY didn't fly into space, storm a beach, or bring back the gold. No sir, we did! It's you and me against the world, son! I like your grit! Hustle could use some work, though. Now let's solve this thing!`,
      `Science isn't about WHY. It's about WHY NOT. Why is so much of our science dangerous? Why not marry safe science if you love it so much. In fact, why not invent a special safety door that won't hit you on the butt on the way out, because you are fired.`,
      `Not you, test subject, you're doing fine.`,
      `Yes, you. Box. Your stuff. Out the front door. Parking lot. Car. Goodbye.`,
      `Congratulations! The simple fact that you're standing here listening to me means you've made a glorious contribution to science.`,
      `As founder and CEO of Aperture Science, I thank you for your participation and hope we can count on you for another round of tests.`,
      `We're not gonna release this stuff into the wild until it's good and damn ready, so as long as you keep yourself in top physical form, there'll always be a limo waiting for you.`,
      `Say goodbye, Caroline.`,
      `She is a gem.`
    ]
    let toSend = quotes[Math.floor(Math.random() * quotes.length)]
    msg.reply(toSend)
  }
};
