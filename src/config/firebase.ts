import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {FirebaseConfigError} from '../utils/errorHandling';

function validateConfig() {
    const requiredEnvVars = [
        'VITE_FIREBASE_API_KEY',
        'VITE_FIREBASE_AUTH_DOMAIN',
        'VITE_FIREBASE_PROJECT_ID'
    ] as const;

    const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

    if (missingVars.length > 0) {
        throw new FirebaseConfigError(
            `Missing required Firebase configuration. Please add the following environment variables:\n` +
            missingVars.map(varName => `- ${varName}`).join('\n')
        );
    }
}

function initializeFirebase() {
    validateConfig();

    const config = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || undefined,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || undefined,
        appId: import.meta.env.VITE_FIREBASE_APP_ID || undefined
    };

    try {
        return initializeApp(config);
    } catch (error) {
        console.error('Error initializing Firebase:', error);
        throw new FirebaseConfigError(
            'Failed to initialize Firebase. Please check your environment variables and Firebase configuration.'
        );
    }
}

const app = initializeFirebase();
export const auth = getAuth(app);
export const db = getFirestore(app);