import { useState } from "react";
import Button from "./Button.js";
import Statistic from "./Statistic.js";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const sum = good + bad + neutral;

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
      <Statistic
        good={good}
        neutral={neutral}
        bad={bad}
        average={(good + bad * -1) / sum}
        positive={(100 * good) / sum}
      >
        good {good}
      </Statistic>
    </>
  );
};

export default App;
