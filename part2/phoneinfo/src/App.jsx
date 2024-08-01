import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
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
      <PersonForm persons={persons} setPersons={setPersons} />
      <Persons filteredNames={filteredNames} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
