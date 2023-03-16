import { Topic } from "../types";

function Content({ topics }: { topics: Topic[] }) {
  return (
    <div>
      {topics.map((topic, i) => (
        <p key={i}>
          {topic.name} {topic.exerciseCount}
        </p>
      ))}
    </div>
  );
}

export default Content;
