// Custom error for Firebase configuration issues
export class FirebaseConfigError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'FirebaseConfigError';
    }
}

// Helper to show user-friendly error messages
export function getAuthErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        switch (error.message) {
            case 'auth/invalid-email':
                return 'Invalid email address';
            case 'auth/user-disabled':
                return 'This account has been disabled';
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return 'Invalid email or password';
            default:
                return 'An error occurred during authentication';
        }
    }
    return 'An unexpected error occurred';
}