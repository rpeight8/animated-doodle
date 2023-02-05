import Input from "./Input";

const AddForm = ({
  firstText,
  onFirstChangeHandler,
  secondText,
  onSecondChangeHandler,
  onAddPressHandler,
  firstValue,
  secondValue,
}) => {
  return (
    <>
      <Input
        labelText={firstText}
        onEditHandle={onFirstChangeHandler}
        value={firstValue}
      ></Input>
      <Input
        labelText={secondText}
        onEditHandle={onSecondChangeHandler}
        value={secondValue}
      ></Input>
      <button onClick={onAddPressHandler}>add</button>
    </>
  );
};

export default AddForm;
