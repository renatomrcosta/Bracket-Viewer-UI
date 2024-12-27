import React from 'react';
import {GamepadIcon} from 'lucide-react';
import {Match} from '../types/match';
import {MatchCard} from './MatchCard';

type GameColumnProps = {
    game: string;
    matches: Match[];
};

export function GameColumn({game, matches}: GameColumnProps) {
    return (
        <div className="bg-gray-800 rounded-lg p-6 h-full">
            <div className="flex items-center gap-2 mb-6">
                <GamepadIcon className="w-6 h-6"/>
                <h2 className="text-2xl font-bold">{game}</h2>
            </div>

            <div className="space-y-4">
                {matches.map((match) => (
                    <MatchCard key={match.id} match={match}/>
                ))}
            </div>
        </div>
    );
}