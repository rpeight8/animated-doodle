// eslint-disable-next-line import/no-extraneous-dependencies
import { useState } from "react";

import PropTypes from "prop-types";
import Input from "./Input";

function BlogForm({ onAddPressHandler }) {
  const [titleValue, setTitleValue] = useState("");
  const [authorValue, setAuthorValue] = useState("");
  const [urlValue, setUrlValue] = useState("");

  const createNote = (event) => {
    event.preventDefault();

    onAddPressHandler({
      title: titleValue,
      author: authorValue,
      url: urlValue,
    });

    setTitleValue("");
    setAuthorValue("");
    setUrlValue("");
  };

  return (
    <form>
      <Input
        labelText="title "
        placeholder="title"
        value={titleValue}
        onEditHandle={(event) => {
          setTitleValue(event.target.value);
        }}
      />
      <Input
        labelText="author "
        value={authorValue}
        placeholder="author"
        onEditHandle={(event) => {
          setAuthorValue(event.target.value);
        }}
      />
      <Input
        labelText="url "
        value={urlValue}
        placeholder="url"
        onEditHandle={(event) => {
          setUrlValue(event.target.value);
        }}
      />
      <button type="submit" onClick={createNote}>
        add
      </button>
    </form>
  );
}

BlogForm.propTypes = {
  onAddPressHandler: PropTypes.func.isRequired,
};

export default BlogForm;
