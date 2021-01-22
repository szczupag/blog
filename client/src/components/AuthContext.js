import { useReducer, createContext } from 'react';

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
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const signIn = (payload) => {
    dispatch({
      type: 'SIGN_IN',
      payload
    })
  }

  const signOut = () => {
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
