/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";

function Input({
  id,
  onEditHandle,
  labelText,
  value,
  placeholder,
  type = "text",
}) {
  const input = id ? (
    <input
      id={id}
      placeholder={placeholder}
      type={type}
      onChange={onEditHandle}
      value={value}
    />
  ) : (
    <input
      placeholder={placeholder}
      type={type}
      onChange={onEditHandle}
      value={value}
    />
  );
  return (
    <>
      {labelText}: {input}
    </>
  );
}

Input.propTypes = {
  onEditHandle: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
};

Input.defaultProps = {
  value: "",
  type: "text",
  placeholder: "",
  id: "",
};

export default Input;
