import ListItem from "./ListItem";

const Parts = ({ parts }) => {
  console.log(parts);
  return (
    <ul>
      {parts.map((part) => (
        <ListItem key={part.id} text={`${part.name} ${part.exercises}`} />
      ))}
    </ul>
  );
};

export default Parts;
