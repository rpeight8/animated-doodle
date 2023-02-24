import { useState } from "react";

import PropTypes from "prop-types";

function BlogListItem({ blog, handleDelete, handleVote, currentUser }) {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const onDetailsPressHandler = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleVoteClick = () => {
    handleVote(blog, true);
  };

  const handleRemoveVoteClick = () => {
    if (blog.votes > 0) {
      handleVote(blog, false);
    }
  };

  return (
    <div className="blog-list__blog-list-item blog-list-item">
      <h3>{blog.title}</h3>
      <p>Author: {blog.author}</p>
      <button type="button" onClick={onDetailsPressHandler}>
        {!detailsVisible ? "Details" : "Hide"}
      </button>
      {detailsVisible && (
        <div>
          <p>URL: {blog.url}</p>
          <div className="votes">
            <p>Votes: {blog.votes}</p>
            <button type="button" onClick={handleVoteClick}>
              Vote
            </button>
            <button type="button" onClick={handleRemoveVoteClick}>
              Remove Vote
            </button>
          </div>
          <p>User: {blog?.userId?.username} </p>
        </div>
      )}
      {currentUser.username === blog?.userId?.username && (
        <button type="button" onClick={() => handleDelete(blog)}>
          Delete
        </button>
      )}
    </div>
  );
}

BlogListItem.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    userId: PropTypes.shape({
      username: PropTypes.string,
    }),
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleVote: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }).isRequired,
};

export default BlogListItem;
