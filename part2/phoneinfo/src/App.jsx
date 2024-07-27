import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    /* fetch()
    fetch("http://localhost:3001/persons")
      .then((response) => response.json())
      .then((data) => setPersons(data));
      */

    //axios
    axios
      .get("http://localhost:3001/persons")
      .then((response) => setPersons(response.data));
  }, []);

  // Set new person
  function handleSubmit(e) {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  }

  function handleChangeName(e) {
    setNewName(e.target.value);
  }
  function handleChangeNumber(e) {
    setNewNumber(e.target.value);
  }

  //filter persons
  function filterName(e) {
    setSearchName(e.target.value);
  }

  const filteredNames = persons.filter((person) =>
    person.name.includes(searchName)
  );

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        <Filter searchName={searchName} filterName={filterName} />
      </div>
      <div>
        <PersonForm
          newName={newName}
          newNumber={newNumber}
          handleChangeName={handleChangeName}
          handleChangeNumber={handleChangeNumber}
          handleSubmit={handleSubmit}
        />
      </div>
      <div>
        <Persons filteredNames={filteredNames} newName={newName} />
      </div>
    </div>
  );
};

export default App;
