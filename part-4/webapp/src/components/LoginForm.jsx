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
        onEditHandle={onUsernameChangeHandler}
        labelText="username"
        value={userName}
      />
      <Input
        onEditHandle={onPasswordChangeHandler}
        labelText="password"
        type="password"
        value={password}
      />
      <button type="submit">login</button>
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
