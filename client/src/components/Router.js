import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AddPost from './AddPost';

const Router = () => {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign-in" render={() => user ? <Redirect to="/" /> : <SignIn />} />
      <Route exact path="/sign-up" render={() => user ? <Redirect to="/" /> : <SignUp />} />
      <Route exact path="/add-post" render={() => user ? <AddPost /> : <Redirect to="/sign-in" />} />
    </BrowserRouter>
  );
}

export default Router;
