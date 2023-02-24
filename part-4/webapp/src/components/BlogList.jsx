/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import BlogListItem from "./BlogListItem";

function BlogList({ items, handleVote, handleDelete, currentUser }) {
  return (
    <ul className="blog-list">
      {items.map((item) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={item.id}>
          <BlogListItem
            blog={item}
            handleVote={handleVote}
            handleDelete={handleDelete}
            currentUser={currentUser}
          />
        </li>
      ))}
    </ul>
  );
}

BlogList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleVote: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    username: PropTypes.string,
  }),
};

BlogList.defaultProps = {
  currentUser: {
    username: "",
  },
};

export default BlogList;
