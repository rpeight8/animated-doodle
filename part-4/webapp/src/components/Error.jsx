// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";

function Error({ error }) {
  return (
    <div>
      <h1>Error</h1>
      <p>{error.message}</p>
    </div>
  );
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }).isRequired,
};

export default Error;
