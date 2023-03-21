import { CoursePart } from "../types";

function Content({ topics }: { topics: CoursePart[] }) {
  return (
    <div>
      {topics.map((topic) => {
        switch (topic.kind) {
          case "basic":
            return (
              <div key={topic.name}>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <p>Exercises: {topic.exerciseCount}</p>
              </div>
            );
          case "group":
            return (
              <div key={topic.name}>
                <h3>{topic.name}</h3>
                <p>Exercises: {topic.exerciseCount}</p>
                <p>Group projects: {topic.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={topic.name}>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
                <p>Exercises: {topic.exerciseCount}</p>
                <p>Read: {topic.backroundMaterial}</p>
              </div>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export default Content;
