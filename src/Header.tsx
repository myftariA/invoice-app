import React, { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

const Header: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <div className="h-16 border-b w-full flex items-center justify-between bg-purple-700 dark:bg-gray-950 text-white dark:text-white p-4">
            <h1 className="text-lg font-bold cursor-default"> A.M Invoicing</h1>
            <button
                onClick={toggleDarkMode}
                title={darkMode ? 'Toogle Light Mode' : 'Toogle Dark Mode'}
                className="bg-transparent focus:outline-none border-none hover:border-none hover:scale-125 transition-all">
                {darkMode ? <FiSun /> : <FiMoon />}
            </button>
        </div>
    );
};

export default Header;
