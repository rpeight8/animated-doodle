import { createContext, useReducer } from "react";

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return action.payload;
    }
    default:
      return state;
  }
};
const initialErrorState = null;
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(authReducer, initialErrorState);

  const setUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    userDispatch({ type: "SET_USER", payload: user });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
