import React from 'react';
import { Match } from '../types/match';
import { useAnimation } from '../hooks/useAnimation';

type MatchCardProps = {
    match: Match;
};

export function MatchCard({ match }: MatchCardProps) {
    const { ref, isVisible } = useAnimation();

    return (
        <div
            ref={ref}
            className={`
        bg-gray-700 p-4 rounded-lg transform
        transition-all duration-500 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
        >
            <div className="text-lg font-semibold mb-2">
                {match.player1} vs {match.player2}
            </div>
            <div className="text-sm text-gray-400">
                Station {match.station}
            </div>
        </div>
    );
}