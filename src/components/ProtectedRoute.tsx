import {Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export function ProtectedRoute({children}: { children: React.ReactNode }) {
    const {user, loading} = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
                <div className="text-gray-600 dark:text-gray-300">Loading...</div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return <>{children}</>;
}