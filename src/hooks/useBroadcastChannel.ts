import { useEffect, useCallback } from 'react';
import { Match } from '../types/match';

const CHANNEL_NAME = 'tournament-matches';

export function useBroadcastChannel(onMatchAdded: (match: Match) => void) {
    const broadcastChannel = new BroadcastChannel(CHANNEL_NAME);

    const broadcastMatch = useCallback((match: Match) => {
        broadcastChannel.postMessage({
            type: 'MATCH_ADDED',
            payload: match
        });
    }, []);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'MATCH_ADDED') {
                onMatchAdded(event.data.payload);
            }
        };

        broadcastChannel.addEventListener('message', handleMessage);

        return () => {
            broadcastChannel.removeEventListener('message', handleMessage);
            broadcastChannel.close();
        };
    }, [onMatchAdded]);

    return { broadcastMatch };
}