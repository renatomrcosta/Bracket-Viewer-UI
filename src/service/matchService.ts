import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import {db} from '../config/firebase';
import {Match} from '../types/match';

const MATCHES_COLLECTION = 'matches';

export type FirestoreMatch = Omit<Match, 'id' | 'createdAt'> & {
    createdAt: Timestamp;
};

// Convert Firestore data to Match type
function convertToMatch(doc: DocumentData): Match {
    const data = doc.data();
    return {
        id: doc.id,
        game: data.game,
        player1: data.player1,
        player2: data.player2,
        station: data.station,
        status: data.status,
        createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to JavaScript Date
    };
}

// Add new match
export async function addMatch(match: Omit<Match, 'id' | 'status' | 'createdAt'>): Promise<string> {
    const matchData: FirestoreMatch = {
        ...match,
        status: 'active',
        createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, MATCHES_COLLECTION), matchData);
    return docRef.id;
}

// Update match status
export async function updateMatchStatus(id: string, status: string): Promise<void> {
    const matchRef = doc(db, MATCHES_COLLECTION, id);
    await updateDoc(matchRef, {status});
}

// Delete match
export async function deleteMatch(id: string): Promise<void> {
    await deleteDoc(doc(db, MATCHES_COLLECTION, id));
}

// Get active matches
export function subscribeToActiveMatches(callback: (matches: Match[]) => void): () => void {
    const q = query(
        collection(db, MATCHES_COLLECTION),
        where('status', '==', 'active'),
        orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (snapshot) => {
        const matches = snapshot.docs.map(convertToMatch);
        callback(matches);
    });
}

// Get match history
export async function getMatchHistory(): Promise<Match[]> {
    const q = query(
        collection(db, MATCHES_COLLECTION),
        orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(convertToMatch);
}