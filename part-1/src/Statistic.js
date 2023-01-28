const Statistic = ({ good, neutral, bad, average, positive }) => {
  if (!good && !neutral && !bad) {
    return <span>No feedback given</span>;
  }

  return (
    <div>
      <span>Good: {good}</span>
      <br></br>
      <span>Neutral: {neutral}</span>
      <br></br>
      <span>Bad: {bad}</span>
      <br></br>
      <span>Average: {average}</span>
      <br></br>
      <span>Postitive: {positive}</span>
    </div>
  );
};

export default Statistic;
