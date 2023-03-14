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
    userDispatch({ type: "SET_USER", payload: user });
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    userDispatch({ type: "SET_USER", payload: null });
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
