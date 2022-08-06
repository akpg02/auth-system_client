import { createContext, useReducer } from "react";

const ACTION_TYPES = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

const INITIAL_STATE = { user: null };

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.LOGIN_USER:
      return { ...state, user: payload };
    case ACTION_TYPES.LOGOUT_USER:
      return { ...state, user: null };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const value = { state, dispatch };
  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
