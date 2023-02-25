/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";

import Input from "./Input";

function LoginForm({
  onLoginPressHandler,
  onPasswordChangeHandler,
  onUsernameChangeHandler,
  userName,
  password,
}) {
  return (
    <form onSubmit={onLoginPressHandler}>
      <Input
        id="login-form__username"
        onEditHandle={onUsernameChangeHandler}
        labelText="username"
        value={userName}
      />
      <Input
        id="login-form__password"
        onEditHandle={onPasswordChangeHandler}
        labelText="password"
        type="password"
        value={password}
      />
      <button id="login-form__login-button" type="submit">
        login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  onLoginPressHandler: PropTypes.func.isRequired,
  onPasswordChangeHandler: PropTypes.func.isRequired,
  onUsernameChangeHandler: PropTypes.func.isRequired,
  userName: PropTypes.string,
  password: PropTypes.string,
};

LoginForm.defaultProps = {
  userName: "",
  password: "",
};

export default LoginForm;
