import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Contact from './Contact';
import AddPost from './AddPost';
import SignOut from './SignOut';

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/sign-in" component={SignIn} />
      <Route exact path="/sign-up" component={SignUp} />
      <Route exact path="/sign-out" component={SignOut} />
      <Route exact path="/add-post" component={AddPost} />
      <Route exact path="/contact-us" component={Contact} />
    </BrowserRouter>
  );
}

export default Router;
