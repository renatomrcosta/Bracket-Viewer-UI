import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

export function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {signIn} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signIn(email, password);
            navigate('/add');
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-900 dark:text-white">
                        Sign in to your account
                    </h2>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 text-sm text-center">{error}</div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                            />
                        </div>

                        <div>
                            <label htmlFor="password"
                                   className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </div>
    );
}