function Finished({ points, maxPoints, highScore, dispatch }) {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You finished the quiz with {points} points ( {Math.ceil(percentage)})%
      </p>
      <p className="highscore">
        High Score: <strong>{highScore}</strong>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default Finished;
