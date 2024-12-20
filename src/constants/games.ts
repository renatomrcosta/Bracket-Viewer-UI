export const GAMES = ['SF6', 'Tekken', 'Strive'] as const;
export type Game = typeof GAMES[number];