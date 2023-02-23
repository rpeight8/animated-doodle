/* eslint-disable import/no-extraneous-dependencies */
import { useState } from "react";
import PropTypes from "prop-types";
import BlogListItem from "./BlogListItem";

function BlogList({ items }) {
  return (
    <ul>
      {items.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={item.id}>
          <BlogListItem blog={item} />
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
};

export default BlogList;
