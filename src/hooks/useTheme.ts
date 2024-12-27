import { useState, useEffect } from 'react';
import { Theme } from '../types/theme';
import { getStoredTheme, setStoredTheme } from '../utils/themeStorage';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

    useEffect(() => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        setStoredTheme(theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(current => current === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
}