import React from 'react';
import { SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-gray-800" />
            ) : (
                <SunIcon className="w-5 h-5 text-gray-200" />
            )}
        </button>
    );
}