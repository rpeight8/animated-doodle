import { useEffect, useState } from "react";
import AddForm from "./components/AddForm";
import Input from "./components/Input";
import List from "./components/List";
import Error from "./components/Error";
import ky from "ky";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchString, setSearchString] = useState("");
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await ky.get("/api/lines").json();
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

  const findPersonByName = (name) => {
    return persons.find((person) => {
      return name === person.name;
    });
  };

  const updateOrCreate = async (person) => {
    const samePerson = findPersonByName(person.name);
    if (samePerson) {
      return await ky.put(`/api/lines/${samePerson._id}`, {
        json: {
          name: samePerson.name,
          number: person.number,
        },
      });
    } else {
      return await ky.post("/api/lines", {
        json: {
          name: person.name,
          number: person.number,
        },
      });
    }
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
    } catch (error) {
      if (error.name === "HTTPError") {
        const errorJson = await error.response.json();
        setError(errorJson);
      }
    }
  };

  return (
    <div>
      {error.message && <Error error={error}></Error>}
      <h2>Phonebook</h2>
      <div>
        <Input labelText="search for" onEditHandle={onNameSearch}></Input>
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
