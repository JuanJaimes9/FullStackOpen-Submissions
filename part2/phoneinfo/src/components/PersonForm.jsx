import { useState } from "react";
import personsService from "../services/persons";

function PersonForm({ persons, setPersons }) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h2>add a new</h2>
        name: <input value={newName} onChange={handleChangeName} />
        number:
        <input type="number" value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default PersonForm;
