import React, { useState } from 'react';
import { GamepadIcon, Loader2Icon } from 'lucide-react';
import { useMatches } from '../context/MatchContext';
import { GAMES } from '../constants/games';

export function MatchForm() {
  const { addMatch } = useMatches();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    game: GAMES[0],
    player1: '',
    player2: '',
    station: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      addMatch({
        game: formData.game,
        player1: formData.player1,
        player2: formData.player2,
        station: parseInt(formData.station),
      });

      // Reset form
      setFormData({
        game: GAMES[0],
        player1: '',
        player2: '',
        station: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <GamepadIcon className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Add New Match</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Game</label>
            <select
              value={formData.game}
              onChange={(e) => setFormData({ ...formData, game: e.target.value })}
              className="w-full bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
            >
              {GAMES.map((game) => (
                <option key={game} value={game}>
                  {game}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Player 1</label>
            <input
              type="text"
              value={formData.player1}
              onChange={(e) => setFormData({ ...formData, player1: e.target.value })}
              className="w-full bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Player 2</label>
            <input
              type="text"
              value={formData.player2}
              onChange={(e) => setFormData({ ...formData, player2: e.target.value })}
              className="w-full bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Station Number</label>
            <input
              type="number"
              value={formData.station}
              onChange={(e) => setFormData({ ...formData, station: e.target.value })}
              className="w-full bg-gray-800 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2Icon className="w-5 h-5 animate-spin" />
                Adding Match...
              </>
            ) : (
              'Add Match'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}