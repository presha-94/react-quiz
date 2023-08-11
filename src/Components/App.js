import Main from "./Main";
import Header from "./Header";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import NextButton from "./NextButton";
import Progress from "./Progress";
import { useEffect, useReducer } from "react";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  timer: null,
  timerlimit: 20,
};
// const {} = state;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataLoading":
      return { ...state, status: "loading" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timer: state.questions.length * state.timerlimit,
      };
    case "newAns":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextBtn":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return { ...initialState, status: "ready", questions: state.questions };
    case "timer":
      return {
        ...state,
        timer: state.timer - 1,
        status: state.timer === 0 ? "finished" : state.status,
      };
    case "timerlimit":
      return { ...state, timerlimit: action.payload };
    default:
      throw new Error(`Unrecognized action: ${action.type}`);
  }
}
export default function App() {
  const [
    { questions, status, index, answer, points, highScore, timer, timerlimit },
    dispatch,
  ] = useReducer(reducer, initialState);
  // const { questions, status } = state;
  const noQuestions = questions.length;
  const maxPoints = questions.reduce((acc, a) => acc + a.points, 0);

  useEffect(function () {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen noQuestions={noQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              questions={noQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
            />
            <Questions
              questions={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} timer={timer} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                noQuestions={noQuestions}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
