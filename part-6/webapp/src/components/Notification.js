import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  useNotificationValue,
  useNotificationDispatch,
} from "../notificationContext";

const Notification = () => {
  const { message } = useNotificationValue();
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    const timeId = setTimeout(() => {
      dispatch({ type: "SET_NOTIFICATION", payload: null });
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return message && <div style={style}>{message}</div>;
};

export default Notification;
