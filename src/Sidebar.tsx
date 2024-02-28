import { RiShoppingBasketLine } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className="border-t-4  border-white top-16 w-52 bg-gray-200 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <Link to='/invoices'>
                <ul className="text-base p-4 overflow-y-auto flex items-center gap-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                    <TbFileInvoice className="text-xl" />
                    <li>Invoice</li>
                </ul>
            </Link>
            <Link to='/articles'>
                <ul className="text-base p-4 overflow-y-auto flex items-center gap-3 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-700 dark:text-white">
                    <RiShoppingBasketLine className="text-xl" />
                    <li>Articles</li>
                </ul>
            </Link>
        </div >
    );
};

export default Sidebar;
