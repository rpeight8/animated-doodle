import { createContext, useReducer } from "react";

const SET_NOTIFICATION = "SET_NOTIFICATION";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case SET_NOTIFICATION: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
const initialNotificationState = {
  message: "",
  type: "",
};
export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatcher] = useReducer(
    notificationReducer,
    initialNotificationState
  );

  const setNotification = (notification) => {
    notificationDispatcher({ type: SET_NOTIFICATION, payload: notification });
  };

  return (
    <NotificationContext.Provider
      value={{
        notification,
        setNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
