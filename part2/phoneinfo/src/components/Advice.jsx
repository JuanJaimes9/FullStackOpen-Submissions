function Advice({ advice }) {
  if (advice === null) {
    return null;
  }

  const className = `advice ${advice === "error" ? "error" : ""}`;

  return (
    <div className={className}>
      {advice === "error" ? "An error occurred" : advice}
    </div>
  );
}

export default Advice;
