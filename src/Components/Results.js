import React from "react";
import resultsImage from "../assets/undraw_winners.svg";

const Results = (props) => {
  return (
    <div className="results-card">
      <img alt="winner img" src={resultsImage}></img>
      <h2>Results</h2>
      <p>
        You got{" "}
        <span className="correct-count">{ props.quizCorrectAnswers }</span>{" "}
        correct answer{props.quizCorrectAnswers > 1 ? 's' : ''}
      </p>
      <button onClick={() => props.startQuiz()}>Try again</button>
    </div>
  );
};

export default Results;
