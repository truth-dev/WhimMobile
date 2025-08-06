import {useState } from "react";

type Rarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

interface LootItem {
    name: string;
    rarity: Rarity;

}

interface PlayerProgress {
    level: number;
    xp: number;
    loot: LootItem | null;
    addXP: (amount: number) => void;
    generateLoot: () => LootItem;
    levelUpPopup: boolean;
    dismissPopup: () => void;

}

const lootTable: { name: string; rarity: Rarity; chance: number}[] =[
    {name: 'Glowing Acorn', rarity: 'common', chance: 50},
    {name: 'Mystic Feather', rarity: 'uncommon', chance: 30},
    {name: 'Enchanted Quill', rarity: 'rare', chance: 15},
    {name: 'Starcaller Crystal', rarity: 'legendary', chance: 10 }
]

const totalWeight = lootTable.reduce((sum, item) => sum + item.chance, 0);

if (totalWeight !== 100) {
    console.warn(`Loot table weights sum to ${totalWeight}, expected 100`);
}

function getRandomLoot(): LootItem {
    const roll = Math.random() * totalWeight;
    let total = 0;

    for(const item of lootTable){
        total += item.chance;
        if(roll <= total){
            return {name: item.name, rarity: item.rarity};
        }
    }
    //fallback in case no loot is generated
    return {name: 'twig of mystery', rarity: 'common'};
}
 
export default function usePlayerProgress(): PlayerProgress {
    const [level, setLevel] = useState(1);
    const [xp, setXp] = useState(0);
  const [loot, setLoot] = useState<LootItem | null>(null);
  const [levelUpPopup, setLevelUpPopup] = useState(false);

  const xpForNextLevel = (lvl: number) => 100 + (lvl - 1) * 50;

  const addXP = (amount: number) => {
    let newXp = xp + amount;
    let newLevel = level;

    while (newXp >= xpForNextLevel(newLevel)) {
      newXp -= xpForNextLevel(newLevel);
      newLevel += 1;
      setLevelUpPopup(true);
    }

    setXp(newXp);
    setLevel(newLevel);
  };

  const generateLoot = () => {
    const item = getRandomLoot();
    setLoot(item);
    return item;
  };

  const dismissPopup = () => setLevelUpPopup(false);

  return {
    level,
    xp,
    loot,
    addXP,
    generateLoot,
    levelUpPopup,
    dismissPopup,
  };
}

