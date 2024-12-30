import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {Match} from '../types/match';
import {useBroadcastChannel} from '../hooks/useBroadcastChannel';
import {GRID_CONFIG} from '../constants/config';
import {addMatch as addMatchToFirestore, subscribeToActiveMatches, updateMatchStatus} from '../service/matchService';

type MatchContextType = {
    matches: Match[];
    addMatch: (match: Omit<Match, 'id' | 'status'>) => Promise<void>;
    removeMatch: (id: string) => Promise<void>;
};

const MatchContext = createContext<MatchContextType | undefined>(undefined);

export function MatchProvider({children}: { children: React.ReactNode }) {
    const [matches, setMatches] = useState<Match[]>([]);

    // Subscribe to active matches
    useEffect(() => {
        const unsubscribe = subscribeToActiveMatches((activeMatches) => {
            setMatches(activeMatches.slice(0, GRID_CONFIG.MAX_MATCHES));
        });

        return () => unsubscribe();
    }, []);

    const handleMatchRemoved = useCallback(async (matchId: string) => {
        try {
            await updateMatchStatus(matchId, 'completed');
        } catch (error) {
            console.error('Error removing match:', error);
        }
    }, []);

    const {broadcastRemoval} = useBroadcastChannel(null, handleMatchRemoved);

    const addMatch = useCallback(async (matchData: Omit<Match, 'id' | 'status'>) => {
        try {
            await addMatchToFirestore(matchData);
        } catch (error) {
            console.error('Error adding match:', error);
        }
    }, []);

    const removeMatch = useCallback(async (id: string) => {
        await handleMatchRemoved(id);
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