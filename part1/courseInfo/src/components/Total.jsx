function Total({ parts }) {
  const TotalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <span>
        Number of exercises: <strong>{TotalExercises}</strong>
      </span>
    </>
  );
}

export default Total;
