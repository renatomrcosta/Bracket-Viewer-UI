import React, {useEffect, useState} from 'react';
import {getMatchHistory} from '../db/database';
import {Match} from '../types/match';

export function HistoryPage() {
    const [history, setHistory] = useState<Array<Match & { created_at: string }>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMatchHistory()
            .then(setHistory)
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-900 p-8 flex items-center justify-center">
                <div className="text-gray-600 dark:text-gray-300">Loading history...</div>
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
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                        {history.map((match) => (
                            <tr key={match.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                                    {new Date(match.created_at).toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.game}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.player1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.player2}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{match.station}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}