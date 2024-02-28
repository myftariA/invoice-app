import './App.css';
import Articles from './Articles';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Invoices from './Invoices';

function App() {

  return (
    <Router>
      <div className='absolute top-0 w-full h-full'>
        <Header />
        <div className='flex w-full ' style={{ height: 'calc(100% - 67.5px)' }}>
          <Sidebar />
          <div className='auto-align'>
            <div className='pageContainer'>
              <Routes>
                <Route path="/articles" element={<Articles />} />
                <Route path="/invoices" element={<Invoices />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App
