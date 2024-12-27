import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MatchGrid } from './components/MatchGrid';
import { MatchForm } from './components/MatchForm';
import { MatchProvider } from './context/MatchContext';
import { Header } from './components/Header';
import { useTheme } from './hooks/useTheme';

export default function App() {
    useTheme(); // Initialize theme

    return (
        <MatchProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <Header />
                    <Routes>
                        <Route path="/" element={<MatchGrid />} />
                        <Route path="/add" element={<MatchForm />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </MatchProvider>
    );
}