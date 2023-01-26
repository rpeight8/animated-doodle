const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Header = ({ name }) => {
    return <h1>{name}</h1>;
  };

  const Content = ({ part, exercise }) => {
    return (
      <p>
        {part} {exercise}
      </p>
    );
  };

  const Footer = ({ total }) => {
    return <p>Number of exercises {total}</p>;
  };

  return (
    <div>
      <Header name={course} />
      <Content part={part1} exersise={exercises1} />
      <Content part={part2} exersise={exercises2} />
      <Content part={part3} exersise={exercises3} />
      <Footer total={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
