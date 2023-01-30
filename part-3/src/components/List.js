const List = ({ items }) => {
  return (
    <ul>
      {items.map((item, i) => {
        return (
          <li key={i}>
            <span>{item.name}</span>
            <span>{item.number}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
