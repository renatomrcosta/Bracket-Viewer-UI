import {Match} from '../types/match';

const DB_NAME = 'tournament-tracker';
const STORE_NAME = 'match-history';
const DB_VERSION = 1;

let db: IDBDatabase | null = null;

const initDB = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            db = request.result;
            resolve();
        };

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBOpenDBRequest).result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, {keyPath: 'id'});
            }
        };
    });
};

export const logMatch = async (match: Match): Promise<void> => {
    if (!db) await initDB();

    return new Promise((resolve, reject) => {
        const transaction = db!.transaction(STORE_NAME, 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const request = store.add({
            ...match,
            created_at: new Date().toISOString()
        });

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve();
    });
};

export const getMatchHistory = async (): Promise<Array<Match & { created_at: string }>> => {
    if (!db) await initDB();

    return new Promise((resolve, reject) => {
        const transaction = db!.transaction(STORE_NAME, 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const matches = request.result.sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
            resolve(matches);
        };
    });
};