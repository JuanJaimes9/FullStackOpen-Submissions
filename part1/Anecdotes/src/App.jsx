import { useState } from "react";

function App() {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState(0);

  function handlerClick() {
    const randomIndex = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomIndex);
  }

  function addVote() {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);

    const maxVotes = Math.max(...copy);
    const maxIndex = copy.indexOf(maxVotes);
    setMostVoted(maxIndex);
  }

  return (
    <>
      <h2>{anecdotes[selected]}</h2>
      <p>Votes: {votes[selected]}</p>
      <button onClick={handlerClick}>Next anecdote</button>
      <button onClick={addVote}>Vote</button>
      <h3>Most Voted Anecdote</h3>
      <p>{anecdotes[mostVoted]}</p>
      <p>Votes: {votes[mostVoted]}</p>
    </>
  );
}

export default App;
