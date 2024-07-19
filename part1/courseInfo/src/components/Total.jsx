function Total({ content }) {
  const TotalExercises = content.reduce((sum, item) => sum + item.exercises, 0);

  return (
    <>
      <span>
        Number of exercises: <strong>{TotalExercises}</strong>
      </span>
    </>
  );
}

export default Total;
