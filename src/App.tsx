import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MatchList } from './components/MatchList';
import { MatchForm } from './components/MatchForm';
import { MonitorIcon, PlusCircleIcon } from 'lucide-react';
import { MatchProvider } from './context/MatchContext';

function App() {
  return (
    <MatchProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-900">
          <nav className="bg-gray-800 p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-white hover:text-gray-300"
              >
                <MonitorIcon className="w-6 h-6" />
                <span className="font-bold">Match Display</span>
              </Link>
              <Link 
                to="/add" 
                className="flex items-center gap-2 text-white hover:text-gray-300"
              >
                <PlusCircleIcon className="w-6 h-6" />
                <span className="font-bold">Add Match</span>
              </Link>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<MatchList />} />
            <Route path="/add" element={<MatchForm />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MatchProvider>
  );
}

export default App;