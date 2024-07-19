import { Header } from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
const App = () => {
  const course = "Half Stack application development";
  const contents = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  return (
    <>
      <Header course={course} />
      <Content content={contents} />
      <Total content={contents} />
    </>
  );
};

export default App;
