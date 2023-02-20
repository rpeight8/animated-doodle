/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";

function Input({ onEditHandle, labelText, value }) {
  return (
    <>
      {labelText}: <input onChange={onEditHandle} value={value} />
    </>
  );
}

Input.propTypes = {
  onEditHandle: PropTypes.func.isRequired,
  labelText: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
