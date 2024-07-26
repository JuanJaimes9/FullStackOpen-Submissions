function PersonForm({
  newName,
  newNumber,
  handleChangeName,
  handleChangeNumber,
  handleSubmit,
}) {
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
