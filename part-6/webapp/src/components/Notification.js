import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => {
    return state.notifications;
  });

  const { message } = notification;

  useEffect(() => {
    const timeId = setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  });

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    transition: "visibility ",
  };
  return message && <div style={style}>{message}</div>;
};

export default Notification;
