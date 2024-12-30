import React, {useEffect, useState} from 'react';
import {Match} from '../types/match';
import {getMatchHistory} from '../service/matchService';

export function HistoryPage() {
    const [history, setHistory] = useState<Match[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const matches = await getMatchHistory();
                setHistory(matches);
            } catch (err) {
                setError('Failed to load match history');
                console.error('Error loading history:', err);
            } finally {
                setLoading(false);
            }
        };

        loadHistory();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-300">Loading history...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
                <div className="text-red-600 dark:text-red-400">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Match History</h1>

                <div className="overflow-x-auto">
                    <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Game</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Player
                                1
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Player
                                2
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Station</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {history.map((match) => (
                            <tr key={match.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                    {match.createdAt.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.game}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.player1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.player2}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.station}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.status}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}