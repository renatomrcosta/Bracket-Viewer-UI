import React, {createContext, useCallback, useContext, useState} from 'react';
import {Match} from '../types/match';
import {useBroadcastChannel} from '../hooks/useBroadcastChannel';
import {GRID_CONFIG} from '../constants/config';

type MatchContextType = {
    matches: Match[];
    addMatch: (match: Omit<Match, 'id' | 'status'>) => void;
    removeMatch: (id: string) => void;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({children}: { children: React.ReactNode }) {
    const [matches, setMatches] = useState<Match[]>([]);

    const handleMatchAdded = useCallback((match: Match) => {
        setMatches(prev => {
            const newMatches = [match, ...prev];
            return newMatches.slice(0, GRID_CONFIG.MAX_MATCHES);
        });
    }, []);

    const handleMatchRemoved = useCallback((matchId: string) => {
        setMatches(prev => prev.filter(match => match.id !== matchId));
    }, []);

    const {broadcastMatch, broadcastRemoval} = useBroadcastChannel(handleMatchAdded, handleMatchRemoved);

    const addMatch = useCallback((matchData: Omit<Match, 'id' | 'status'>) => {
        const newMatch = {
            ...matchData,
            id: crypto.randomUUID(),
            status: 'active',
        };
        handleMatchAdded(newMatch);
        broadcastMatch(newMatch);
    }, [broadcastMatch, handleMatchAdded]);

    const removeMatch = useCallback((id: string) => {
        handleMatchRemoved(id);
        broadcastRemoval(id);
    }, [broadcastRemoval, handleMatchRemoved]);

    return (
        <MatchContext.Provider value={{matches, addMatch, removeMatch}}>
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