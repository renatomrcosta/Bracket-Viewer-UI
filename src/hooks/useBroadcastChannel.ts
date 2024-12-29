import {useCallback, useEffect, useRef} from 'react';
import {Match} from '../types/match';

const CHANNEL_NAME = 'tournament-matches';

export function useBroadcastChannel(
    onMatchAdded: (match: Match) => void,
    onMatchRemoved: (matchId: string) => void
) {
    const channelRef = useRef<BroadcastChannel | null>(null);

    useEffect(() => {
        channelRef.current = new BroadcastChannel(CHANNEL_NAME);

        const handleMessage = (event: MessageEvent) => {
            switch (event.data.type) {
                case 'MATCH_ADDED':
                    onMatchAdded(event.data.payload);
                    break;
                case 'MATCH_REMOVED':
                    onMatchRemoved(event.data.payload);
                    break;
            }
        };

        channelRef.current.addEventListener('message', handleMessage);

        return () => {
            if (channelRef.current) {
                channelRef.current.removeEventListener('message', handleMessage);
                channelRef.current.close();
                channelRef.current = null;
            }
        };
    }, [onMatchAdded, onMatchRemoved]);

    const broadcastMatch = useCallback((match: Match) => {
        if (channelRef.current) {
            channelRef.current.postMessage({
                type: 'MATCH_ADDED',
                payload: match
            });
        }
    }, []);

    const broadcastRemoval = useCallback((matchId: string) => {
        if (channelRef.current) {
            channelRef.current.postMessage({
                type: 'MATCH_REMOVED',
                payload: matchId
            });
        }
    }, []);

    return {broadcastMatch, broadcastRemoval};
}