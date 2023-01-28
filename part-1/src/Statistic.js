import StatisticLine from "./StatisticLine";

const Statistic = ({ good, neutral, bad, average, positive }) => {
  if (!good && !neutral && !bad) {
    return <span>No feedback given</span>;
  }

  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <tr>
            <td>
              <StatisticLine text="Good" value={good}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Neutral" value={neutral}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Bad" value={bad}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine text="Average" value={average}></StatisticLine>
            </td>
          </tr>
          <tr>
            <td>
              <StatisticLine
                text="Postitive"
                value={positive}
                postText="%"
              ></StatisticLine>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Statistic;
