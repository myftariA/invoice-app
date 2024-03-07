
import Items from './Items';
import Sidebar from './Sidebar';
import Customers from './Customers';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Invoices from './Invoices';
import Login from './Login';
import { useUserContext } from './UserContext';


const AppContent: React.FC = () => {
    const { user } = useUserContext();
    return (
        <div className='absolute top-0 w-full h-full'>
            <Header />
            <div className='flex w-full ' style={{ minHeight: 'calc(100% - 64px)' }}>
                {user && <Sidebar />}
                <div className='auto-align dark:bg-gray-800 dark:text-white'>
                    <div className='pageContainer p-2 dark:bg-gray-700'>
                        {user ? (<Routes>
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/items" element={<Items />} />
                            <Route path="/customers" element={<Customers />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={!user ? <Navigate to="/login" /> : null} />
                        </Routes>) : (<Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="*" element={!user ? <Navigate to="/login" /> : null} />
                        </Routes>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { AppContent };