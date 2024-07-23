import { useState } from "react";

function Button({ onClick, text }) {
  return (
    <div>
      <button onClick={onClick}>{text}</button>
    </div>
  );
}

function Stadistics({
  good,
  bad,
  neutral,
  total,
  average,
  positivePercentage,
}) {
  return (
    <>
      <tr>
        <StadisticsLine text="Good" value={good} />
      </tr>
      <tr>
        <StadisticsLine text="Neutral" value={neutral} />
      </tr>
      <tr>
        <StadisticsLine text="Bad" value={bad} />
      </tr>
      <tr>
        <StadisticsLine text="Total" value={total} />
      </tr>
      <tr>
        <StadisticsLine text="Average" value={average} />
      </tr>
      <tr>
        <StadisticsLine text="Positive" value={positivePercentage} />
      </tr>
    </>
  );
}

const StadisticsLine = ({ text, value }) => (
  <td>
    {text}: {value}
  </td>
);

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

  const total = good + bad + neutral;
  const average = total ? (good - bad) / total : 0;
  const positivePercentage = total ? (good / total) * 100 + "%" : 0;

  return (
    <>
      <h2>give feedback</h2>
      <Button onClick={goodValue} text="good" />
      <Button onClick={neutralValue} text="neutral" />
      <Button onClick={badValue} text="bad" />

      <h2>stadistics</h2>
      {total === 0 ? (
        <h3>No feedback given</h3>
      ) : (
        <table>
          <tbody>
            <Stadistics
              good={good}
              bad={bad}
              neutral={neutral}
              total={total}
              average={average}
              positivePercentage={positivePercentage}
            />
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
