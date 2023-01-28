import ListItem from "./ListItem";

const Parts = ({ parts, showTotal }) => {
  console.log(showTotal);
  return (
    <ul>
      {parts.map((part) => (
        <ListItem key={part.id} text={`${part.name} ${part.exercises}`} />
      ))}
      {showTotal && (
        <ListItem
          key="total"
          text={`total of ${parts.reduce((sum, part) => {
            sum += part.exercises;
            return sum;
          }, 0)} exercises`}
        />
      )}
    </ul>
  );
};

export default Parts;
