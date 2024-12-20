import React from 'react';
import { GamepadIcon } from 'lucide-react';
import { useMatches } from '../context/MatchContext';
import { GAMES } from '../constants/games';

export function MatchList() {
  const { matches } = useMatches();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Active Matches</h1>
      
      <div className="grid grid-cols-3 gap-8">
        {GAMES.map((game) => (
          <div key={game} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <GamepadIcon className="w-6 h-6" />
              <h2 className="text-2xl font-bold">{game}</h2>
            </div>
            
            <div className="space-y-4">
              {matches
                .filter((match) => match.game === game)
                .map((match) => (
                  <div
                    key={match.id}
                    className="bg-gray-700 p-4 rounded-lg"
                  >
                    <div className="text-lg font-semibold mb-2">
                      {match.player1} vs {match.player2}
                    </div>
                    <div className="text-sm text-gray-400">
                      Station {match.station}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}