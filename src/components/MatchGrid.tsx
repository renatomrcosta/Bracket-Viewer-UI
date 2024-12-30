import React, {useEffect, useState} from 'react';
import {MatchCard} from './MatchCard';
import {GRID_CONFIG} from '../constants/config';
import {useMatches} from '../context/MatchContext';
import {Match} from '../types/match';

export function MatchGrid() {
    const {matches, removeMatch} = useMatches();
    const [animatedMatches, setAnimatedMatches] = useState<Array<Match & { isNew?: boolean; isLeaving?: boolean }>>([]);

    useEffect(() => {
        const maxMatches = GRID_CONFIG.MAX_MATCHES;
        const currentIds = new Set(matches.map(m => m.id));

        setAnimatedMatches(prev => {
            // Mark leaving matches
            const leaving = prev
                .filter(m => !currentIds.has(m.id))
                .map(m => ({...m, isLeaving: true}));

            leaving.forEach((m) => {
                removeMatch(m.id)
            });


            // Add new matches
            const newMatches = matches
                .slice(0, maxMatches)
                .map(m => ({
                    ...m,
                    isNew: !prev.some(p => p.id === m.id),
                    isLeaving: false
                }));

            return [...newMatches, ...leaving];
        });

        // Cleanup leaving matches after animation
        const cleanupTimer = setTimeout(() => {
            setAnimatedMatches(prev => prev.filter(m => !m.isLeaving));
        }, 500); // Match the animation duration

        return () => clearTimeout(cleanupTimer);
    }, [matches]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-8">
            <div className="max-w-7xl mx-auto">
                <div
                    className="grid gap-6 justify-items-center"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_CONFIG.COLUMNS}, minmax(300px, 1fr))`,
                        gridTemplateRows: `repeat(${GRID_CONFIG.ROWS}, 300px)`,
                    }}
                >
                    {animatedMatches.map((match, index) => (
                        <div
                            key={match.id}
                            className="transform transition-all duration-500 ease-out"
                            style={{
                                gridRow: `${Math.floor(index / GRID_CONFIG.COLUMNS) + 1}`,
                                gridColumn: `${(index % GRID_CONFIG.COLUMNS) + 1}`,
                            }}
                        >
                            <MatchCard
                                match={match}
                                isNew={!!match.isNew}
                                isLeaving={!!match.isLeaving}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}