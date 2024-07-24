export const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

export const Part = ({ name, exercises }) => {
  return (
    <>
      <h2>{name}</h2>
      <p>{exercises}</p>
    </>
  );
};

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

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },

      {
        name: "Using props to pass data",
        exercises: 7,
      },

      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
