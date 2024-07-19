import { Part } from "./Part";
const Content = ({ content }) => {
  return (
    <>
      {content.map((item, index) => (
        <Part key={index} part={item.part} exercises={item.exercises} />
      ))}
    </>
  );
};

export default Content;
