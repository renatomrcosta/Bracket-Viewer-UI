import { useEffect, useCallback, useRef } from 'react';
import { Match } from '../types/match';

const CHANNEL_NAME = 'tournament-matches';

export function useBroadcastChannel(onMatchAdded: (match: Match) => void) {
    const channelRef = useRef<BroadcastChannel | null>(null);

    useEffect(() => {
        // Create the channel when the hook mounts
        channelRef.current = new BroadcastChannel(CHANNEL_NAME);

        const handleMessage = (event: MessageEvent) => {
            if (event.data.type === 'MATCH_ADDED') {
                onMatchAdded(event.data.payload);
            }
        };

        channelRef.current.addEventListener('message', handleMessage);

        return () => {
            // Clean up the channel when the hook unmounts
            if (channelRef.current) {
                channelRef.current.removeEventListener('message', handleMessage);
                channelRef.current.close();
                channelRef.current = null;
            }
        };
    }, [onMatchAdded]);

    const broadcastMatch = useCallback((match: Match) => {
        if (channelRef.current) {
            channelRef.current.postMessage({
                type: 'MATCH_ADDED',
                payload: match
            });
        }
    }, []);

    return { broadcastMatch };
}