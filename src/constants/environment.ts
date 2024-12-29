// Environment configuration with defaults
export const getEnvironmentConfig = () => ({
    grid: {
        columns: Number(import.meta.env.VITE_GRID_COLUMNS) || 3,
        rows: Number(import.meta.env.VITE_GRID_ROWS) || 3,
        maxMatches: Number(import.meta.env.VITE_MAX_MATCHES) || 9,
    }
});