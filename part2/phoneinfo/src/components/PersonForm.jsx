import { useState } from "react";
import Advice from "./Advice";
import personsService from "../services/persons";

function PersonForm({
  persons,
  setPersons,
  advice,
  setAdvice,
  setError,
  error,
}) {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const person = persons.find((person) => person.name === newName);

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const numberChanged = {
          ...person,
          number: newNumber,
        };

        personsService
          .update(person.id, numberChanged)
          .then((updatedPerson) => {
            setPersons(
              persons.map((p) =>
                p.id === updatedPerson.id ? updatedPerson : p
              )
            );
            setNewName("");
            setNewNumber("");
            setAdvice("Number updated!");
            setError(null);

            setTimeout(() => {
              setAdvice(null);
              setError(null);
            }, 10000);
          })
          .catch((error) => {
            setError(error.response?.data?.error || "An error occurred");

            setTimeout(() => {
              setAdvice(null);
              setError(null);
            }, 10000);
          });
      } else {
        alert("number do not changed");
      }
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: `${
        persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1
      }`,
    };

    personsService
      .create(newPerson)
      .then((createdPerson) => {
        setPersons(persons.concat(createdPerson));
        setNewName("");
        setNewNumber("");
        setAdvice("New name added!");
        setError(null);

        setTimeout(() => {
          setAdvice(null);
          setError(null);
        }, 10000);
      })
      .catch((error) => {
        console.log(error.response?.data?.error || "An error occurred");
        setError(error.response?.data?.error || "An error occurred");

        setTimeout(() => {
          setAdvice(null);
          setError(null);
        }, 10000);
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
        <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
      <Advice advice={advice} error={error} />
    </form>
  );
}

export default PersonForm;
