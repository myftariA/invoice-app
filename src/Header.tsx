import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <header className="top-0 left-0 w-full fixed bg-purple-700 dark:bg-gray-900 text-white dark:text-white p-4 flex justify-between items-center">
            <h1 className="text-lg font-bold ">
                <Link to='/' className='text-white hover:text-white'> A.M Invoicing </Link>
            </h1>
            <button
                onClick={toggleDarkMode}
                className="bg-transparent focus:outline-none border-none hover:border-none hover:scale-125 transition-all">
                {darkMode ? <FiSun /> : <FiMoon />}
            </button>
        </header>
    );
};

export default Header;
