import {getEnvironmentConfig} from "./environment.ts";

const env = getEnvironmentConfig();

export const GRID_CONFIG = {
    COLUMNS: env.grid.columns,
    ROWS: env.grid.rows,
    MAX_MATCHES: env.grid.maxMatches,
} as const;