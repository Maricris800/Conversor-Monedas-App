import React from 'react';
import { CurrencyConverter } from './components/CurrencyConverter';


// Main App component (renders CurrencyConverter)
export const MainApp = () => {
    // IMPORTANT: Replace 'YOUR_API_KEY_HERE' with your actual FreecurrencyAPI.com API key

    
    const API_KEY = import.meta.env.VITE_API_KEY;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4 font-sans">
            <CurrencyConverter API_KEY={API_KEY} />
        </div>
    );
};

