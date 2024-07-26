function Persons({ filteredNames, newName }) {
  return (
    <div>
      <h2>Numbers</h2>
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
  );
}

export default Persons;
