const Anecdote = ({ text, votes = 0, onVoteHandle, onNextHandle, type }) => {
  return (
    <>
      <p>{text}</p>
      <br></br>
      <span>has {votes} votes</span>
      <br></br>
      {type !== "topAnec" && (
        <>
          {" "}
          <button onClick={onVoteHandle}>Vote</button>
          <button onClick={onNextHandle}>Next anecdote</button>
        </>
      )}
    </>
  );
};

export default Anecdote;
