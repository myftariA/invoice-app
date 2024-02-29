import { RiShoppingBasketLine } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className=" border-white top-16 w-52 bg-gray-200 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
            <ul className="pt-3 flex flex-col cursor-pointer text-gray-700 dark:text-white">
                <Link to='/invoices' className='sidebar-list dark:text-white dark:hover:text-blue-400'>
                    <TbFileInvoice className="text-xl" />
                    <li>Invoice</li>
                </Link>
                <Link to='/articles' className='sidebar-list dark:text-white dark:hover:text-blue-400'>
                    <RiShoppingBasketLine className="text-xl" />
                    <li>Articles</li>
                </Link>
            </ul>
        </div >
    );
};

export default Sidebar;
