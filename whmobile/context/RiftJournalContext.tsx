// import React, { createContext, useContext, useState, ReactNode } from 'react';

// interface JournalEntry {
//   id: string;
//   rift: string;
//   xp: number;
//   loot: string;
//   rarity: string;
//   timestamp: number;
// }

// interface RiftJournalContextType {
//   entries: JournalEntry[];
//   addEntry: (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => void;
//   clearJournal: () => void;
// }

// const RiftJournalContext = createContext<RiftJournalContextType | undefined>(undefined);

// export const RiftJournalProvider = ({ children }: { children: ReactNode }) => {
//   const [entries, setEntries] = useState<JournalEntry[]>([]);

//   const addEntry = (entry: Omit<JournalEntry, 'id' | 'timestamp'>) => {
//     setEntries((prev) => [
//       {
//         ...entry,
//         id: Math.random().toString(36).substring(2),
//         timestamp: Date.now(),
//       },
//       ...prev,
//     ]);
//   };

//   const clearJournal = () => setEntries([]);

//   return (
//     <RiftJournalContext.Provider value={{ entries, addEntry, clearJournal }}>
//       {children}
//     </RiftJournalContext.Provider>
//   );
// };

// export const useRiftJournal = () => {
//   const context = useContext(RiftJournalContext);
//   if (!context) throw new Error('useRiftJournal must be used within a RiftJournalProvider');
//   return context;
// };
