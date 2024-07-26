import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

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
