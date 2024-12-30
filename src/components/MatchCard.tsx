import React from 'react';
import {Match} from '../types/match';
import {GAME_LOGOS} from '../constants/gameLogos';
import {useCardAnimation} from '../hooks/useCardAnimation';
import {MonitorIcon} from 'lucide-react';
import {useMatches} from '../context/MatchContext';
import {useAuth} from "../context/AuthContext.tsx";

type MatchCardProps = {
    match: Match;
    isNew: boolean;
    isLeaving: boolean;
};

export function MatchCard({match, isNew, isLeaving}: MatchCardProps) {
    const {isVisible, isBlinking} = useCardAnimation(isNew, isLeaving);
    const {removeMatch} = useMatches();
    const {user} = useAuth();

    const handleDoubleClick = () => {
        if (user) {
            removeMatch(match.id);
        }
    };

    return (
        <div
            onDoubleClick={handleDoubleClick}
            className={`
        w-[300px] h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative
        transform transition-all duration-500 ease-out cursor-pointer
        hover:scale-[1.02] active:scale-[0.98]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        ${isBlinking ? 'animate-soft-blink' : ''}
        ${isLeaving ? 'animate-fade-out scale-95' : ''}
      `}
        >
            {/* Game Logo */}
            <div className="h-24 relative bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img
                        src={GAME_LOGOS[match.game]}
                        alt={`${match.game} logo`}
                        className="w-20 h-20 object-contain opacity-80"
                    />
                </div>
            </div>

            <div className="flex h-[calc(300px-96px)]">
                {/* Station Number */}
                <div
                    className="w-20 border-r border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-2">
                    <MonitorIcon className="w-8 h-8 text-gray-500 dark:text-gray-400"/>
                    <span className="text-xl font-bold text-gray-500 dark:text-gray-400">
            {match.station}
          </span>
                </div>

                {/* Player Names */}
                <div className="flex-1 flex flex-col items-center justify-center gap-3 px-4">
                    <div className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                        {match.player1}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        vs
                    </div>
                    <div className="text-lg font-semibold text-center text-gray-900 dark:text-white">
                        {match.player2}
                    </div>
                </div>
            </div>
        </div>
    );
}