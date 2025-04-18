export interface OctaviaQuest {
    id: string;
    title: string;
    description: string;
    requirements: {
      xp: number;
      completeGuildScroll: boolean;
    };
    status: 'available' | 'completed';
    rewards: {
      xp: number;
      codexFragmentId: string;
      loot: string;
    };
    hologramMessage: string[];
  }
  