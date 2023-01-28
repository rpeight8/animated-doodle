import { useState } from "react";
import Anecdote from "./Anecdote";

const App = () => {
  const getRandomAnecdoteId = () => {
    return anecdotes[Math.floor(Math.random() * anecdotes.length)].id;
  };

  const [anecdotes, setAnecdotes] = useState([
    {
      id: 0,
      text: "Anec1",
      votes: 1,
    },
    {
      id: 1,
      text: "Anec2",
      votes: 2,
    },
    {
      id: 2,
      text: "Anec3",
      votes: 3,
    },
  ]);

  const [currentAnecdoteId, setCurrentAnecdoteId] = useState(
    getRandomAnecdoteId()
  );

  const topAnecdote = [...anecdotes].sort((a, b) => b.votes - a.votes)[0];

  return (
    <>
      <Anecdote
        text={anecdotes[currentAnecdoteId].text}
        votes={anecdotes[currentAnecdoteId].votes}
        onVoteHandle={() => {
          setAnecdotes(
            anecdotes.map((anec) => {
              const copy = { ...anec };
              if (copy.id === currentAnecdoteId) copy.votes++;
              return copy;
            })
          );
        }}
        onNextHandle={() => {
          setCurrentAnecdoteId(getRandomAnecdoteId());
        }}
      ></Anecdote>
      <Anecdote
        text={topAnecdote.text}
        votes={topAnecdote.votes}
        type="topAnec"
      ></Anecdote>
    </>
  );
};

export default App;
