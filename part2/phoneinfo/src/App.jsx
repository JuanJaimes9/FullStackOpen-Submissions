import { useState } from "react";

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
        <h2>search</h2>
        <input type="text" value={searchName} onChange={filterName} />
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <h2>add a new</h2>
          name: <input value={newName} onChange={handleChangeName} />
          number:
          <input
            type="number"
            value={newNumber}
            onChange={handleChangeNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredNames.map((person, i) =>
          person.name !== newName ? (
            <div key={i}>
              <p>{`${person.name} - ${
                person.number ? `${person.number}` : `don't have number yet`
              }`}</p>
            </div>
          ) : (
            alert(`${newName} is already added to phonebook`)
          )
        )}
      </div>
    </div>
  );
};

export default App;
