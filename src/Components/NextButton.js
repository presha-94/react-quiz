function NextButton({ dispatch, answer, index, noQuestions }) {
  // console.log(answer && "answer");
  if (index < noQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        disabled={answer === null}
        onClick={() => dispatch({ type: "nextBtn" })}
      >
        Next
      </button>
    );
  } else {
    return (
      <button
        className="btn btn-ui"
        disabled={answer === null}
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
  }
}
export default NextButton;
