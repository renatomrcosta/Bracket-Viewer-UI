import React from 'react';
import { GameColumn } from './GameColumn';
import { useMatches } from '../context/MatchContext';
import { GAMES } from '../constants/games';
import { getLatestMatches } from '../utils/matchUtils';

export function MatchList() {
    const { matches } = useMatches();

    const activeGames = GAMES.filter(game =>
        getLatestMatches(matches, game).length > 0
    );

    const columns = Math.min(activeGames.length, 3);
    const gridCols = columns === 1 ? 'grid-cols-1' :
        columns === 2 ? 'grid-cols-2' :
            'grid-cols-3';

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-4xl font-bold text-center mb-8">Active Matches</h1>

            <div className={`grid ${gridCols} gap-8 auto-rows-fr`}>
                {activeGames.map((game) => (
                    <GameColumn
                        key={game}
                        game={game}
                        matches={getLatestMatches(matches, game)}
                    />
                ))}
            </div>
        </div>
    );
}