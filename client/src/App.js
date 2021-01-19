import Router from './components/Router';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <Header loggedIn={false} />
      <Router />
    </>
  );
};

export default App;
