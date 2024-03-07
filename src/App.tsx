import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { AppContent } from './AppContent';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent></AppContent>
      </UserProvider>
      <Toaster></Toaster>
    </Router>
  );
}

export default App
