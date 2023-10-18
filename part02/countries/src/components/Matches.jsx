function Matches({ matches, setMatches, setQuery }) {
  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (matches.length === 1) {
    return null;
  }

  return (
    <>
      {matches.map((match) => (
        <div
          key={match}
          style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
        >
          <p>{match}</p>
          <button
            onClick={() => {
              setMatches([match]);
              setQuery('');
            }}
          >
            Show
          </button>
        </div>
      ))}
    </>
  );
}

export default Matches;
