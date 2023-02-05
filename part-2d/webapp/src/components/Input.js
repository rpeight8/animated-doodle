const Input = ({ onEditHandle, labelText, value }) => {
  return (
    <>
      {labelText}: <input onChange={onEditHandle} value={value} />
    </>
  );
};

export default Input;
