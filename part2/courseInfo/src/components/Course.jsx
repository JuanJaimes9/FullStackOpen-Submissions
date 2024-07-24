const Header = ({ name }) => {
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

const Part = ({ name, exercises }) => {
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

export default function Course({ courses }) {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
}
