import { useState } from "react";
import Button from "./Button.js";
import Statistic from "./Statistic.js";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button
        handleClick={() => {
          setGood(good + 1);
        }}
      >
        good
      </Button>
      <Button
        handleClick={() => {
          setNeutral(neutral + 1);
        }}
      >
        neutral
      </Button>
      <Button
        handleClick={() => {
          setBad(bad + 1);
        }}
      >
        bad
      </Button>
      <h1>statistic</h1>
      <Statistic>good {good}</Statistic>
      <Statistic>neutral {neutral}</Statistic>
      <Statistic>bad {bad}</Statistic>
    </>
  );
};

export default App;
