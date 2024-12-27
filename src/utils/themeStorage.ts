import { Theme } from '../types/theme';

const THEME_KEY = 'tournament-theme';

export function getStoredTheme(): Theme {
    return (document.cookie.split('; ').find(row => row.startsWith(THEME_KEY))?.split('=')[1] as Theme) || 'dark';
}

export function setStoredTheme(theme: Theme) {
    document.cookie = `${THEME_KEY}=${theme};path=/;max-age=31536000`; // 1 year
}