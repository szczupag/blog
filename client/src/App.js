import Router from './components/Router';
import Header from './components/Header';
import { AuthProvider } from './components/AuthContext';

const App = () => (
  <AuthProvider>
    <Header />
    <Router />
  </AuthProvider>
);

export default App;
