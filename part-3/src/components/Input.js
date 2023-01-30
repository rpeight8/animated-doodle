const Input = ({ onEditHandle, labelText }) => {
  return (
    <>
      {labelText}: <input onChange={onEditHandle} />
    </>
  );
};

export default Input;
