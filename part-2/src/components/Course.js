import Header from "./Header";
import Parts from "./Parts";

const Course = ({ course }) => {
  console.log(course);
  return (
    <div>
      <Header name={course.name} />
      <Parts parts={[...course.parts]}></Parts>
    </div>
  );
};

export default Course;
