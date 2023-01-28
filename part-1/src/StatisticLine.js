const StatisticLine = ({ text, value, postText }) => {
  return (
    <span>
      {text}: {value}
      {postText ? ` ${postText}` : ``}
    </span>
  );
};

export default StatisticLine;
