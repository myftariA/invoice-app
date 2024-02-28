import './App.css';
import Articles from './Articles';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Invoices from './Invoices';

function App() {

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/articles" element={<Articles />} />
          <Route path="/invoices" element={<Invoices />} />
        </Routes>
        <div className="flex flex-col w-full">
          <Header />
        </div>
      </div>
    </Router>
  );
}

export default App
