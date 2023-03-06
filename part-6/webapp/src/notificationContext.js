import { createContext, useContext, useReducer } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  message: null,
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => useContext(NotificationContext).state;
export const useNotificationDispatch = () =>
  useContext(NotificationContext).dispatch;
