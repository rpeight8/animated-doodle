import ky from "ky";

import { useEffect, useState } from "react";
import AddForm from "./components/AddForm";
import Input from "./components/Input";
import List from "./components/List";
import Error from "./components/Error";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ky.get("/api/lines").json();
        setPersons(data);
      } catch (err) {
        setError(err);
      }
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

  const findPersonByName = (name) =>
    persons.find((person) => name === person.name);

  const updateOrCreate = async (person) => {
    const samePerson = findPersonByName(person.name);
    if (samePerson) {
      return ky.put(`/api/lines/${samePerson._id}`, {
        json: {
          name: samePerson.name,
          number: person.number,
        },
      });
    }

    return ky.post("/api/lines", {
      json: {
        name: person.name,
        number: person.number,
      },
    });
  };

  const onAddClick = async (event) => {
    event.preventDefault();

    try {
      await updateOrCreate({
        name: newName,
        number: newNumber,
      });
      setNewName("");
      setNewNumber("");
      const data = await ky.get("/api/lines").json();
      setPersons(data);
      setError({});
    } catch (err) {
      if (err.name === "HTTPError") {
        const errorJson = await err.response.json();
        setError(errorJson);
      }
    }
  };

  return (
    <div>
      {error.message && <Error error={error} />}
      <h2>Phonebook</h2>
      <div>
        <Input labelText="search for" onEditHandle={onNameSearch} />
      </div>
      <h2>add a new</h2>
      <AddForm
        firstText="name "
        secondText="number "
        firstValue={newName}
        secondValue={newNumber}
        onFirstChangeHandler={onNameChange}
        onSecondChangeHandler={onNumberChange}
        onAddPressHandler={onAddClick}
      />
      <h2>Numbers</h2>
      <List items={persons.filter(({ name }) => name.includes(searchString))} />
    </div>
  );
}

export default App;