import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Tooglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => ({
    toggleVisibility,
  }));
  return (
    <div>
      {visible ? children : null}
      <button type="button" onClick={toggleVisibility}>
        {visible ? "cancel" : buttonLabel}
      </button>
    </div>
  );
});

Tooglable.displayName = "Tooglable";

Tooglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  refs: PropTypes.shape({
    current: PropTypes.func.isRequired,
  }),
};

Tooglable.defaultProps = {
  refs: undefined,
};

export default Tooglable;
