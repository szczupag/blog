import { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initState = {
  user: null
}

if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  } else {
    initState.user = decodedToken;
  }
}

const AuthContext = createContext({
  user: null,
  signIn: (payload) => { },
  signOut: () => { }
});

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        user: action.payload
      }
    case 'SIGN_OUT':
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, initState);

  const signIn = (payload) => {
    localStorage.setItem('jwtToken', payload.token);
    dispatch({
      type: 'SIGN_IN',
      payload
    })
  }

  const signOut = () => {
    localStorage.removeItem('jwtToken');
    dispatch({
      type: 'SIGN_OUT',
    })
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, signIn, signOut }}
      {...props}
    />
  )
}

export {
  AuthContext,
  AuthProvider,
};
