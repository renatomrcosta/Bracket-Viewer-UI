import React, {createContext, useContext, useEffect, useState} from 'react';
import {onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut, User} from 'firebase/auth';
import {auth} from '../config/firebase';
import {getAuthErrorMessage} from "../utils/errorHandling.ts";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setError(null);
        } catch (err) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
            setError(null);
        } catch (err) {
            const message = getAuthErrorMessage(err);
            setError(message);
            throw new Error(message);
        }
    };

    const clearError = () => setError(null);

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            signIn,
            signOut,
            clearError
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}