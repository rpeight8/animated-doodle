import { useEffect, useState } from "react";
import AddForm from "./components/AddForm";
import Input from "./components/Input";
import List from "./components/List";
import ky from "ky";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await ky.get("http://localhost:3001/api/lines").json();
      setPersons(data);
    };

    fetchData().catch(console.error);
  }, []);

  const onNameSearch = (event) => {
    setSearchString(event.target.value);
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const isUnique = (name, number) => {
    return !persons.some((person) => {
      return name === person.name || number === person.number;
    });
  };

  const onAddClick = (event) => {
    event.preventDefault();
    if (!isUnique(newName, newNumber)) {
      alert(`${newName} already exists`);
      return;
    }

    setPersons(
      persons.concat({
        name: newName,
        number: newNumber,
      })
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Input labelText="search for" onEditHandle={onNameSearch}></Input>
      </div>
      <h2>add a new</h2>
      <AddForm
        firstText="name: "
        secondText="number: "
        onFirstChangeHandler={onNameChange}
        onSecondChangeHandler={onNumberChange}
        onAddPressHandler={onAddClick}
      ></AddForm>
      <h2>Numbers</h2>
      <List
        items={persons.filter(({ name }) => {
          return name.includes(searchString);
        })}
      ></List>
    </div>
  );
};

export default App;
