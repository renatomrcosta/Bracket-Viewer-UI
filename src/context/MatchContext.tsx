import React, { createContext, useContext, useState, useCallback } from 'react';
import { Match } from '../types/match';
import { useBroadcastChannel } from '../hooks/useBroadcastChannel';

type MatchContextType = {
  matches: Match[];
  addMatch: (match: Omit<Match, 'id' | 'status'>) => void;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({ children }: { children: React.ReactNode }) {
  const [matches, setMatches] = useState<Match[]>([]);

  const handleMatchAdded = useCallback((match: Match) => {
    setMatches(prev => [match, ...prev]);
  }, []);

  const { broadcastMatch } = useBroadcastChannel(handleMatchAdded);

  const addMatch = useCallback((matchData: Omit<Match, 'id' | 'status'>) => {
    const newMatch = {
      ...matchData,
      id: crypto.randomUUID(),
      status: 'active',
    };
    setMatches(prev => [newMatch, ...prev]);
    broadcastMatch(newMatch);
  }, [broadcastMatch]);

  return (
      <MatchContext.Provider value={{ matches, addMatch }}>
        {children}
      </MatchContext.Provider>
  );
}

export function useMatches() {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error('useMatches must be used within a MatchProvider');
  }
  return context;
}