import React from 'react';
import {Link} from 'react-router-dom';
import {ThemeToggle} from './ThemeToggle';
import {History, LogOut} from 'lucide-react';
import {useAuth} from '../context/AuthContext';

export function Header() {
    const {user, signOut} = useAuth();

    return (
        <header className="bg-gray-100 dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link
                    to="/"
                    className="text-2xl font-bold text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                    Upcoming Matches
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        to="/history"
                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        aria-label="Match History"
                    >
                        <History className="w-5 h-5 text-gray-800 dark:text-gray-200"/>
                    </Link>
                    <ThemeToggle/>
                    {user ? (
                        <>
                            <Link to="/add">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                    Add Match
                                </button>
                            </Link>
                            <button
                                onClick={() => signOut()}
                                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                aria-label="Sign out"
                            >
                                <LogOut className="w-5 h-5 text-gray-800 dark:text-gray-200"/>
                            </button>
                        </>
                    ) : (
                        <Link to="/login">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                Sign In
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}