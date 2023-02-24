/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";

function Input({ onEditHandle, labelText, value, type = "text" }) {
  return (
    <>
      {labelText}: <input type={type} onChange={onEditHandle} value={value} />
    </>
  );
}

Input.propTypes = {
  onEditHandle: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  value: "",
  type: "text",
};

export default Input;
