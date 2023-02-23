import { useState } from "react";

import PropTypes from "prop-types";

function BlogListItem({ blog, handleDelete, handleVote }) {
  const [votes, setVotes] = useState(blog.votes);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const onDetailsPressHandler = () => {
    setDetailsVisible(!detailsVisible);
  };

  const handleVoteClick = () => {
    handleVote(blog.id);
    setVotes(votes + 1);
  };

  const handleRemoveVoteClick = () => {
    if (votes > 0) {
      handleVote(blog.id);
      setVotes(votes - 1);
    }
  };

  return (
    <div className="blog-list-item">
      <h3>{blog.title}</h3>
      <p>Author: {blog.author}</p>
      <button type="button" onClick={onDetailsPressHandler}>
        {!detailsVisible ? "Details" : "Hide"}
      </button>
      {detailsVisible && (
        <div>
          <p>URL: {blog.url}</p>
          <div className="votes">
            <p>Votes: {votes}</p>
            <button type="button" onClick={handleVoteClick}>
              Vote
            </button>
            <button type="button" onClick={handleRemoveVoteClick}>
              Remove Vote
            </button>
          </div>
          <p>User: {blog.userId?.username} </p>
        </div>
      )}
      <button type="button" onClick={() => handleDelete(blog.id)}>
        Delete
      </button>
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
};

export default BlogListItem;
