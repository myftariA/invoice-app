import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { AppContent } from './AppContent';


const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <AppContent></AppContent>
      </UserProvider>
    </Router>
  );
}

export default App
