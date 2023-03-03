import { filterChange } from "../reducers/filtersReducer";
import { useDispatch } from "react-redux";

function NotesFilters() {
  const dispatch = useDispatch();
  const filterSelected = (filter) => {
    dispatch(filterChange(filter));
  };

  return (
    <div>
      all{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("ALL")}
      />
      important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("IMPORTANT")}
      />
      nonimportant{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => filterSelected("NONIMPORTANT")}
      />
    </div>
  );
}

export default NotesFilters;
