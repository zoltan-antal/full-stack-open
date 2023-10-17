function Course({ course }) {
  const total = course.parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <p>total of {total} exercises</p>
    </>
  );
}

export default Course;
