function Advice({ advice, error }) {
  if (advice === null && error === null) {
    return null;
  }

  return (
    <div className={advice ? "advice" : "error"}>
      {advice ? advice : `An error occurred: ${error}`}
    </div>
  );
}

export default Advice;
