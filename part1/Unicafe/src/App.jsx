import { useState } from "react";

function ButtonFeedback({ onClick, text }) {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

function Stadistics({ good, bad, neutral }) {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  return (
    <>
      <div>
        <p>good: {good}</p>
        <p>meutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>all: {all}</p>
        <p>average: {all ? average : "add some stadistics"}</p>
        <p>positive:{all ? positive + "%" : "add some stadistics"}</p>
      </div>
    </>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function goodValue() {
    setGood(good + 1);
  }

  function neutralValue() {
    setNeutral(neutral + 1);
  }

  function badValue() {
    setBad(bad + 1);
  }

  return (
    <>
      <h2>give feedback</h2>
      <ButtonFeedback onClick={goodValue} text="good" />
      <ButtonFeedback onClick={neutralValue} text="neutral" />
      <ButtonFeedback onClick={badValue} text="bad" />

      <h2>stadistics</h2>
      {good || bad || neutral ? (
        <div>
          <Stadistics good={good} bad={bad} neutral={neutral} />
        </div>
      ) : (
        "No feedback given"
      )}
    </>
  );
}

export default App;
