/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";

function Input({ onEditHandle, labelText, value, placeholder, type = "text" }) {
  return (
    <>
      {labelText}:{" "}
      <input
        placeholder={placeholder}
        type={type}
        onChange={onEditHandle}
        value={value}
      />
    </>
  );
}

Input.propTypes = {
  onEditHandle: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  value: "",
  type: "text",
  placeholder: "",
};

export default Input;
