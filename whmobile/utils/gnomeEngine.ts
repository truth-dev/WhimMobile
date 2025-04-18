export type GnomeEffect =
  | 'lootLoss'
  | 'xpDrain'
  | 'lootGift'
  | 'scannerJam'
  | 'distraction'
  | 'weirdBuff';

export interface GnomeEvent {
  triggered: boolean;
  message: string;
  effect?: GnomeEffect;

}
export interface RareGnome {
    name: string;
    rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary' | 'Mythic';
    intro: string;
    effect: GnomeEffect;
    chance: number;
  }
  const rareGnomes: RareGnome[] = [
    {
      name: 'Garden Grumbler',
      rarity: 'Common',
      intro: '🪴 A Garden Grumbler shuffled by...',
      effect: 'distraction',
      chance: 60,
    },
    {
      name: 'Sneaky Sock Snatcher',
      rarity: 'Uncommon',
      intro: '🧦 A Sneaky Sock Snatcher cackled in the distance...',
      effect: 'lootLoss',
      chance: 25,
    },
    {
      name: 'Arcane Doodle Gnome',
      rarity: 'Rare',
      intro: '✍️ An Arcane Doodle Gnome scribbled on your spellbook!',
      effect: 'xpDrain',
      chance: 10,
    },
    {
      name: 'Giggling Reality Bender',
      rarity: 'Legendary',
      intro: '🎭 A Giggling Reality Bender bent space and time... for fun.',
      effect: 'scannerJam',
      chance: 4,
    },
    {
      name: '👑 King Chaos Gnome',
      rarity: 'Mythic',
      intro: '👑 *King Chaos Gnome* descends in a burst of confetti and confusion!',
      effect: 'weirdBuff',
      chance: 1,
    },
  ];


  
  

  export const triggerRareGnome = (): GnomeEvent => {
    const roll = Math.random() * 100;
    let total = 0;
  
    for (const gnome of rareGnomes) {
      total += gnome.chance;
      if (roll <= total) {
        return {
          triggered: true,
          message: gnome.intro,
          effect: gnome.effect,
        };
      }
    }
  
    // Fallback (should never hit)
    return {
      triggered: false,
      message: '',
    };
  };


//saving this for future reference, for plugging this into quest, etc.
/**import { triggerGnomeMischief } from '../utils/gnomeEngine';

const result = triggerGnomeMischief(); // Optional chance parameter (default 15%)

if (result.triggered) {
  Alert.alert('🧌 Gnome Mischief!', result.message);

  switch (result.effect) {
    case 'lootLoss':
      // removeLoot();
      break;
    case 'xpDrain':
      // setXp(xp => Math.max(0, xp - 10));
      break;
    case 'lootGift':
      // giveWeirdLoot();
      break;
    // etc.
  }
}
  */