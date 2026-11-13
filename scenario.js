const situations = [
  {
    title: 'Something new or frustrating',
    example: 'A new caregiver, tummy time, a noisy place, or a change in routine.',
    art: 'tummy-time',
    route: 'a2',
    tone: 'aqua',
    heading: 'New things can feel like a lot when you’re little.',
    recognition: 'A different person, place, routine, or activity may bring some frustration or uncertainty. Let’s look at what your baby seems to need right now.',
  },
  {
    title: 'Something bigger or scary',
    example: 'A medical visit, illness, a sudden frightening event, or a major change.',
    art: 'medical-visit',
    route: 'b2',
    tone: 'peach',
    heading: 'Some moments can feel bigger than everyday frustration.',
    recognition: 'If something frightening, painful, or disruptive happened, you do not need to decide how serious the stress response is. Start with what is happening around your baby now.',
  },
  {
    title: 'Stress has been piling up',
    example: 'Repeated disruptions, family stress, changing routines, or a lot changing at once.',
    art: 'daily-demands',
    route: 'c2',
    tone: 'sage',
    heading: 'Sometimes it is not one big event. It is many things adding up.',
    recognition: 'When daily life keeps changing or feeling difficult, start with what feels possible today.',
  },
];

const questions = {
  a2: {
    title: 'What seems to be happening now?',
    intro: 'Is your baby beginning to settle with your support, or do they still seem to need more help?',
    choices: [['Starting to settle', 'result'], ['Still having a hard time', 'r2'], ['I’m not sure', 'r2']],
  },
  b2: {
    title: 'Is the stressful situation over, or is it still happening?',
    choices: [['It is over now', 'r3'], ['It is still happening, or I’m not sure', 'b3']],
  },
  b3: {
    title: 'Is there one part of the stress you can reduce right now?',
    intro: 'You do not have to fix the whole situation. Think about whether one part could become a little easier.',
    choices: [['Yes', 'r4'], ['Not really', 'r5'], ['I’m not sure', 'r5']],
  },
  c2: {
    title: 'Is there one source of stress you can realistically reduce today?',
    intro: 'A small change is enough to start with. If nothing feels changeable right now, that is okay too.',
    choices: [['Yes, maybe', 'r4'], ['No', 'r5'], ['I’m not sure', 'r5']],
  },
};

const results = {
  result: {
    title: 'Stay Close and Follow Their Lead',
    art: 'stay-close',
    tone: 'sage',
    intro: [
      'Your baby seems to be starting to settle.',
      'You can stay nearby, keep offering support, and follow their cues about what they need next.',
    ],
    actions: [
      { title: 'Stay close', paragraphs: ['Be available. Respond if your baby reaches for comfort or seems to need more help.'] },
      { title: 'Keep something familiar', paragraphs: ['A familiar voice, routine, person, or response can add predictability.'] },
      { title: 'Follow their cues', paragraphs: [
        'If your baby keeps settling, there is no need to change the moment right away.',
        'If they become more upset, you can offer more support or make things simpler.',
      ] },
    ],
    why: 'Stress responses are part of how the body responds to challenge. A brief or manageable difficulty is not automatically harmful when support and recovery are available.',
  },
  r2: {
    title: 'Help Them Reset',
    art: 'help-reset',
    tone: 'aqua',
    intro: [
      'Your baby is not settling yet.',
      'This may be a moment for more support and less going on at once.',
    ],
    actions: [
      { title: 'Make the moment simpler', paragraphs: ['When possible, pause what you are doing, reduce extra stimulation, or return to something familiar.'] },
      { title: 'Stay close', paragraphs: ['Offer comfort and responsive attention while your baby settles.'] },
      { title: 'Give it some time', paragraphs: ['There is no need to add another challenge right away.'] },
    ],
    why: 'Stress-response systems activate during a challenge and then need time to settle again. Recovery is part of the process.',
  },
  r3: {
    title: 'Reconnect and Recover',
    art: 'reconnect',
    tone: 'peach',
    intro: ['The stressful event is over, but your baby may still need time and support to settle.'],
    actions: [
      { title: 'Reconnect', paragraphs: ['Offer closeness, comfort, and responsive attention.'] },
      { title: 'Return to familiar things', paragraphs: ['When possible, return to familiar routines, people, spaces, or activities.'] },
      { title: 'Make room for recovery', paragraphs: ['Your baby may not return to their usual mood or behavior right away. Give them some time.'] },
    ],
    why: 'After a stress response activates, returning toward a resting state matters. Support and predictability can help create conditions for recovery.',
  },
  r4: {
    title: 'Lower the Load',
    art: 'lower-load',
    tone: 'sage',
    intro: [
      'The stress is still here, but you may be able to make one part of the day a little lighter.',
      'You do not have to solve everything at once.',
    ],
    actions: [
      { title: 'Reduce what you can', paragraphs: ['Look for one avoidable demand, disruption, or source of stimulation that could wait or change.'] },
      { title: 'Keep one thing familiar', paragraphs: ['A familiar routine or response can add some predictability when other things are changing.'] },
      { title: 'Stay connected', paragraphs: ['Keep offering responsive attention when you can.'] },
    ],
    why: 'Long or repeated stress can place greater demands on developing stress-response systems. Reducing some of the load and adding support can help create better conditions for recovery.',
    note: '<p><strong>Some stressors are outside your control.</strong></p><p>This is not about fixing everything yourself.</p>',
  },
  r5: {
    title: 'Bring in Support',
    art: 'bring-support',
    tone: 'peach',
    intro: [
      'Some situations are too ongoing or too heavy for one person to carry alone.',
      'If you need more support, that does not mean you are doing something wrong. Support for you and your family is also part of caring for your baby.',
    ],
    actions: [
      {
        title: 'Let someone share the load',
        paragraphs: [
          'Think about one person, service, or practical support that could help with one part of what you are carrying.',
          'Support might come from:',
        ],
        list: [
          'family or someone you trust,',
          'childcare,',
          "your baby's health care provider,",
          'community services,',
          'help with food, housing, transportation, or other daily needs.',
        ],
      },
      { title: 'Keep one thing steady', paragraphs: ['When bigger problems cannot change quickly, a familiar routine or response can still add some predictability.'] },
      { title: 'Choose one next step', paragraphs: ['You do not need to solve every problem today.', 'One useful next step is enough for now.'] },
    ],
    why: 'Babies grow within families and communities. Caregivers are better able to offer steady, responsive care when they also have practical and social support around them.',
    note: '<p>Needing help is not a parenting category or a sign that you have failed.</p><p>Many sources of stress come from circumstances that no caregiver can change alone.</p>',
    supportLink: true,
  },
};
