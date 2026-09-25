export type QuestRealm =
  | 'Home'
  | 'Local'
  | 'Expedition';

export type QuestCategory =
  | 'Explore'
  | 'Discover'
  | 'Create';

export type QuestDifficulty =
  | 'Easy'
  | 'Medium'
  | 'Hard';

export interface Quest {
  id: string;
  title: string;
  description: string;
  realm: QuestRealm;
  category: QuestCategory;
  difficulty: QuestDifficulty;
  xp: number;
}