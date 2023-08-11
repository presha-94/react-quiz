function Progress({ questions, index, points, maxPoints }) {
  return (
    <header className="progress">
      <progress value={index + 1} max={questions} />
      <p>
        Questions <strong>{index + 1}</strong>/<strong> {questions}</strong>
      </p>
      <p>
        Points: <strong>{points}</strong>/<strong>{maxPoints}</strong>{" "}
      </p>
    </header>
  );
}

export default Progress;
