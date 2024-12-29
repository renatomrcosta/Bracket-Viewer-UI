import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {MatchGrid} from './components/MatchGrid';
import {MatchForm} from './components/MatchForm';
import {HistoryPage} from './pages/HistoryPage';
import {MatchProvider} from './context/MatchContext';
import {Header} from './components/Header';
import {useTheme} from './hooks/useTheme';

export default function App() {
    useTheme();

    return (
        <MatchProvider>
            <BrowserRouter>
                <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                    <Header/>
                    <Routes>
                        <Route path="/" element={<MatchGrid/>}/>
                        <Route path="/add" element={<MatchForm/>}/>
                        <Route path="/history" element={<HistoryPage/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </MatchProvider>
    );
}