import { useState } from "react";
import PropTypes from "prop-types";

function Tooglable({ children, buttonLabel }) {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  return (
    <div>
      {visible ? children : null}
      <button type="button" onClick={toggleVisibility}>
        {visible ? "cancel" : buttonLabel}
      </button>
    </div>
  );
}

Tooglable.propTypes = {
  children: PropTypes.node.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};

export default Tooglable;
