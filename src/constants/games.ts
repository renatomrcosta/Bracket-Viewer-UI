export const GAMES = ['SF6', 'Tekken8', 'GGST', 'SamSho', 'VF5'] as const;
export type Game = typeof GAMES[number];