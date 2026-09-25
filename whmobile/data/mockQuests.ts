import type { Quest } from '../type/quest';

export const mockQuests: Quest[] = [
  {
    id: 'take-the-long-way',
    title: 'Take the Long Way',
    description:
      'Choose a route you normally ignore the next time you head somewhere familiar.',
    realm: 'Local',
    category: 'Explore',
    difficulty: 'Easy',
    xp: 20,
  },

  {
    id: 'soundtrack-the-moment',
    title: 'Soundtrack the Moment',
    description:
      'Find a song you have never heard before and listen to it all the way through.',
    realm: 'Home',
    category: 'Discover',
    difficulty: 'Easy',
    xp: 15,
  },

  {
    id: 'make-something-useless',
    title: 'Make Something Useless',
    description:
      'Create something purely because it sounds fun. Draw it, build it, write it, or invent it.',
    realm: 'Home',
    category: 'Create',
    difficulty: 'Easy',
    xp: 20,
  },

  {
    id: 'hidden-in-plain-sight',
    title: 'Hidden in Plain Sight',
    description:
      'Find something interesting nearby that you have passed before but never stopped to notice.',
    realm: 'Local',
    category: 'Discover',
    difficulty: 'Medium',
    xp: 30,
  },

  {
    id: 'tiny-expedition',
    title: 'The Tiny Expedition',
    description:
      'Visit a public place you have never explored before and spend some time wandering through it.',
    realm: 'Expedition',
    category: 'Explore',
    difficulty: 'Medium',
    xp: 50,
  },

  {
    id: 'kitchen-experiment',
    title: 'Kitchen Experiment',
    description:
      'Make something you have never cooked before. Success is optional. Evidence of chaos is acceptable.',
    realm: 'Home',
    category: 'Create',
    difficulty: 'Medium',
    xp: 35,
  },

  {
    id: 'three-strange-things',
    title: 'Three Strange Things',
    description:
      'While you are out, find three unusual details you normally would have walked past.',
    realm: 'Local',
    category: 'Discover',
    difficulty: 'Easy',
    xp: 25,
  },

  {
    id: 'make-a-field-note',
    title: 'Make a Field Note',
    description:
      'Go somewhere interesting and create a small record of the trip through writing, drawing, or photos.',
    realm: 'Expedition',
    category: 'Create',
    difficulty: 'Medium',
    xp: 45,
  },

  {
    id: 'somewhere-new',
    title: 'Somewhere New',
    description:
      'Choose a public destination you have never visited and make a small adventure out of getting there.',
    realm: 'Expedition',
    category: 'Explore',
    difficulty: 'Hard',
    xp: 75,
  },
];