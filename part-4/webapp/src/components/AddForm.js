import Input from "./Input";

const AddForm = ({
  firstText,
  onFirstChangeHandler,
  secondText,
  onSecondChangeHandler,
  onAddPressHandler,
}) => {
  return (
    <>
      <Input labelText={firstText} onEditHandle={onFirstChangeHandler}></Input>
      <Input
        labelText={secondText}
        onEditHandle={onSecondChangeHandler}
      ></Input>
      <button onClick={onAddPressHandler}>add</button>
    </>
  );
};

export default AddForm;
