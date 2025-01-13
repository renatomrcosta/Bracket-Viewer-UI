export const GAMES = ['Tekken8', 'GGST', 'Mystery', 'SamSho', 'VF5'] as const;
export type Game = typeof GAMES[number];