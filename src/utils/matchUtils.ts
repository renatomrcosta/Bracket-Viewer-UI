import { Match } from '../types/match';

const MAX_MATCHES_PER_GAME = 3;

export function getLatestMatches(matches: Match[], game: string): Match[] {
    return matches
        .filter(match => match.game === game)
        .slice(0, MAX_MATCHES_PER_GAME);
}