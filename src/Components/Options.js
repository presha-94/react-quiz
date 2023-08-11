function Options({ questions, answer, dispatch }) {
  const ansState = answer !== null;
  return (
    <div>
      {" "}
      <div className="options">
        {questions.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              ansState
                ? index === questions.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            disabled={ansState}
            onClick={() => dispatch({ type: "newAns", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
