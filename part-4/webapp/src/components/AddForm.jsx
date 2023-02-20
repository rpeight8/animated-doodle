// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import Input from "./Input";

function AddForm({
  firstText,
  onFirstChangeHandler,
  secondText,
  onSecondChangeHandler,
  onAddPressHandler,
  firstValue,
  secondValue,
}) {
  return (
    <>
      <Input
        labelText={firstText}
        onEditHandle={onFirstChangeHandler}
        value={firstValue}
      />
      <Input
        labelText={secondText}
        onEditHandle={onSecondChangeHandler}
        value={secondValue}
      />
      <button type="submit" onClick={onAddPressHandler}>
        add
      </button>
    </>
  );
}

AddForm.propTypes = {
  firstText: PropTypes.string.isRequired,
  onFirstChangeHandler: PropTypes.func.isRequired,
  secondText: PropTypes.string.isRequired,
  onSecondChangeHandler: PropTypes.func.isRequired,
  onAddPressHandler: PropTypes.func.isRequired,
  firstValue: PropTypes.string.isRequired,
  secondValue: PropTypes.string.isRequired,
};

export default AddForm;
