import React from 'react';
import { FaUser } from 'react-icons/fa';
import { RiShoppingBasketLine } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="transition-all w-8 border-white top-16 sm:w-52 bg-gray-200 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
            <ul className="pt-3 flex flex-col cursor-pointer text-gray-700 dark:text-white">
                <NavLink to='/invoices'
                    className={({ isActive }) => isActive ? 'sidebar-list dark:text-white dark:hover:text-blue-400 dark:bg-slate-500 bg-white rounded-sm' : 'sidebar-list dark:text-white dark:hover:text-blue-400 rounded-sm'} >
                    <TbFileInvoice className="text-lg" />
                    <li className='hidden text-[17px] sm:block'>Invoice</li>
                </NavLink>
                <NavLink to='/items'
                    className='sidebar-list dark:text-white dark:hover:text-blue-400 active:bg-red'>
                    <RiShoppingBasketLine className="text-lg" />
                    <li className='hidden text-[17px] sm:block'>Items</li>
                </NavLink>
                <NavLink to='/customers'
                    className='sidebar-list dark:text-white dark:hover:text-blue-400 active:bg-red'>
                    <FaUser className="text-lg" />
                    <li className='hidden text-[17px] sm:block'>Customers</li>
                </NavLink>
            </ul>
        </div >
    )
};

export default Sidebar;
