/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";

import Input from "./Input";

function LoginForm({ onLoginPressHandler }) {
  return (
    <>
      <Input labelText="username" />
      <Input labelText="password" />
      <button type="submit" onClick={onLoginPressHandler}>
        login
      </button>
    </>
  );
}

LoginForm.propTypes = {
  onLoginPressHandler: PropTypes.func.isRequired,
};

export default LoginForm;
