const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header course={course} />
      <Content
        parts={[
          { name: part1, count: exercises1 },
          { name: part2, count: exercises2 },
          { name: part3, count: exercises3 },
        ]}
      />
      <Total counts={[exercises1, exercises2, exercises3]} />
    </div>
  );
};

export default App;

function Header({ course }) {
  return <p>{course}</p>;
}

function Content({ parts }) {
  return (
    <div>
      <Part name={parts[0].name} count={parts[0].count} />
      <Part name={parts[1].name} count={parts[1].count} />
      <Part name={parts[2].name} count={parts[2].count} />
    </div>
  );
}

function Part({ name, count }) {
  return (
    <p>
      {name} {count}
    </p>
  );
}

function Total({ counts }) {
  return (
    <p>Number of exercises {counts.reduce((acc, curr) => acc + curr, 0)}</p>
  );
}
