import Router from './components/Router';
import Header from './components/Header';
import { AuthProvider } from './components/AuthContext';

const App = () => (
  <AuthProvider>
    <Header />
    <div className="contentWrapper">
      <Router />
    </div>
  </AuthProvider>
);

export default App;
