import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MatchGrid} from './components/MatchGrid';
import {MatchForm} from './components/MatchForm';
import {HistoryPage} from './pages/HistoryPage';
import {LoginPage} from './pages/LoginPage';
import {MatchProvider} from './context/MatchContext';
import {AuthProvider} from './context/AuthContext';
import {ProtectedRoute} from './components/ProtectedRoute.tsx';
import {Header} from './components/Header';
import {useTheme} from './hooks/useTheme';

export default function App() {
    useTheme();

    return (
        <AuthProvider>
            <MatchProvider>
                <BrowserRouter>
                    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                        <Header/>
                        <Routes>
                            <Route path="/" element={<MatchGrid/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/add" element={
                                <ProtectedRoute>
                                    <MatchForm/>
                                </ProtectedRoute>
                            }/>
                            <Route path="/history" element={
                                <ProtectedRoute>
                                    <HistoryPage/>
                                </ProtectedRoute>
                            }/>
                        </Routes>
                    </div>
                </BrowserRouter>
            </MatchProvider>
        </AuthProvider>
    );
}