/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";

function List({ items }) {
  return (
    <ul>
      {items.map((item, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <li key={i}>
          <span>{item.name}</span> <span>{item.number}</span>
        </li>
      ))}
    </ul>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default List;
