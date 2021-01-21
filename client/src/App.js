import {useState} from 'react';
import Router from './components/Router';
import Header from './components/Header';
import { AuthProvider } from './components/AuthContext';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  return (
    <AuthProvider value={{
      authenticated,
      setAuthenticated,
      username,
      setUsername,
    }}>
      <Header />
      <Router />
    </AuthProvider>
  );
};

export default App;
