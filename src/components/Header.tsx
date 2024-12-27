import React from 'react';
import {Link} from 'react-router-dom';
import {ThemeToggle} from './ThemeToggle';

export function Header() {
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
                    <ThemeToggle/>
                    <Link to="/add">
                        <img
                            src="/logos/bka.png"
                            alt="BKA Logo"
                            className="h-12 w-auto hover:opacity-80 transition-opacity"
                        />
                    </Link>
                </div>
            </div>
        </header>
    );
}