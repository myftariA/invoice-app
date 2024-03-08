import { LogOutIcon } from 'lucide-react';
import { useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useUserContext } from './UserContext';

interface HeaderProps {
    currentPage: string
}
const Header = ({ currentPage }: HeaderProps) => {
    const { user, logout } = useUserContext();
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <div className="h-16 border-b w-full flex items-center justify-between bg-purple-700 dark:bg-gray-950 text-white dark:text-white p-4">
            <h1 className="text-lg font-bold cursor-default"> {currentPage ? currentPage : 'A.M Invoicing'}</h1>
            <div className='flex items-center gap-0.5 mr-1'>
                <button
                    onClick={toggleDarkMode}
                    title={darkMode ? 'Toogle Light Mode' : 'Toogle Dark Mode'}
                    className="bg-transparent focus:outline-none border-none hover:border-none hover:scale-150 transition-all duration-300">
                    {darkMode ? <FiSun /> : <FiMoon />}
                </button>
                {user && <button onClick={logout} title='Log Out' className="bg-transparent focus:outline-none border-none hover:border-none hover:scale-150 duration-300 transition-all">
                    <LogOutIcon className=' size-1 '></LogOutIcon>
                </button>}
            </div>
        </div>
    );
};

export default Header;
