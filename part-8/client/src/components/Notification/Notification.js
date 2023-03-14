import Alert from "react-bootstrap/Alert";
import { useContext, useEffect, useState } from "react";
import { NotificationContext } from "../../providers/NotificationProvider";

const Notification = () => {
  const { notification, setNotification } = useContext(NotificationContext);
  const { message, type } = notification;

  console.log("Notification: initial render");

  useEffect(() => {
    if (!message) {
      return;
    }

    const timeId = setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
    }, 2000);

    return () => {
      clearTimeout(timeId);
    };
  });

  if (!message) {
    return null;
  }

  console.log("Notification: render");

  return (
    <Alert
      variant={type || "info"}
      transition={false}
      show={message && message.length}
    >
      {message}
    </Alert>
  );
};

export default Notification;
