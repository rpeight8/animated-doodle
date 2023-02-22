// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import Input from "./Input";

function BlogForm({
  onAddPressHandler,
  titleValue,
  authorValue,
  urlValue,
  onTitleChangeHandler,
  onAuthorChangeHandler,
  onUrlChangeHandler,
}) {
  const onTitleChange = (event) => {
    onTitleChangeHandler(event.target.value);
  };
  const onAuthorChange = (event) => {
    onAuthorChangeHandler(event.target.value);
  };
  const onUrlChange = (event) => {
    onUrlChangeHandler(event.target.value);
  };
  return (
    <form>
      <Input
        labelText="title "
        value={titleValue}
        onEditHandle={onTitleChange}
      />
      <Input
        labelText="author "
        value={authorValue}
        onEditHandle={onAuthorChange}
      />
      <Input labelText="url " value={urlValue} onEditHandle={onUrlChange} />
      <button type="submit" onClick={onAddPressHandler}>
        add
      </button>
    </form>
  );
}

BlogForm.propTypes = {
  onAddPressHandler: PropTypes.func.isRequired,
  titleValue: PropTypes.string.isRequired,
  authorValue: PropTypes.string.isRequired,
  urlValue: PropTypes.string.isRequired,
  onTitleChangeHandler: PropTypes.func.isRequired,
  onAuthorChangeHandler: PropTypes.func.isRequired,
  onUrlChangeHandler: PropTypes.func.isRequired,
};

export default BlogForm;
