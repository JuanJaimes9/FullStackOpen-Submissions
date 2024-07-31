import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    personsService
      .getAll()
      .then((initialPeople) => {
        setPersons(initialPeople);
      })
      .catch((error) => {
        console.error("Error getting data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${
        persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1
      }`,
    };

    personsService.create(newPerson).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");
    });
  };

  const handleChangeName = (e) => setNewName(e.target.value);
  const handleChangeNumber = (e) => setNewNumber(e.target.value);

  const filterName = (e) => setSearchName(e.target.value);

  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );

  const deletePerson = (id) => {
    const personToDelete = persons.find((p) => p.id === id);

    if (personToDelete) {
      if (window.confirm(`Delete ${personToDelete.name}?`)) {
        personsService
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id));
          })
          .catch((error) => {
            console.error("Error deleting person:", error);
          });
      }
    } else {
      console.error("Person not found");
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter searchName={searchName} filterName={filterName} />
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        handleSubmit={handleSubmit}
      />
      <Persons
        filteredNames={filteredNames}
        newName={newName}
        deletePerson={deletePerson}
      />
    </div>
  );
};

export default App;
