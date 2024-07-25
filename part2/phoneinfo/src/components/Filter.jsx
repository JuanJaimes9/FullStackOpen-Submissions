function Filter({ searchName, filterName }) {
  return (
    <>
      <h2>search</h2>
      <input type="text" value={searchName} onChange={filterName} />
    </>
  );
}

export default Filter;
