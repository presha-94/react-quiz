function StartScreen({ noQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Its Quiz Time..!!</h2>
      <h3>There are {noQuestions} questions </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets go...
      </button>
      <p className="counter">Set Time limit for each question (secs) </p>
      <input
        type="number"
        className="input"
        onChange={(e) =>
          dispatch({ type: "timerlimit", payload: e.target.value })
        }
      />
    </div>
  );
}

export default StartScreen;
