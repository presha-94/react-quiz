import { useEffect } from "react";

function Timer({ dispatch, timer }) {
  useEffect(
    function () {
      const timerfn = setInterval(function () {
        // console.log(timer);
        dispatch({ type: "timer" });
      }, 1000);
      return () => clearInterval(timerfn);
    },
    [dispatch, timer]
  );
  const min = Math.floor(timer / 60);
  const secs = timer % 60;
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{secs < 10 && "0"}
      {secs}
    </div>
  );
}

export default Timer;
