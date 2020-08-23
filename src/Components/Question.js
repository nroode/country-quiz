import React from "react";
import cardImage from "../assets/undraw_adventure.svg";

//Note - filter out countries without capitals? e.g., McDonald Isalnd?

const Question = (props) => {
  const questionA = () => {
    return (
      <div>
        <h2 className="question">
          {props.questionSet[props.quizAnswerIndex].capital} is the capital of
          ... ?
        </h2>
      </div>
    );
  };

  const questionB = () => {
    return (
      <div>
        <img
          src={props.questionSet[props.quizAnswerIndex].flag}
          className="flag-img"
          alt="flag"
        ></img>
        <h2 className="question">Which country does this flag belong to? </h2>
      </div>
    );
  };

  const checkAnswer = (e) => {
    //check if IDs match
    let correctAnswer = document.getElementById(props.quizAnswerIndex);
    const correctIcon = `<i class="material-icons">check_circle_outline</i>`;
    const incorrectIcon = `<i class="material-icons">highlight_off</i>`;

    if (Number(e.target.id) !== props.quizAnswerIndex) {
      let incorrectAnswer = e.target.closest(".answer-choice");
      incorrectAnswer.className = "answer-choice incorrect";
      incorrectAnswer.insertAdjacentHTML("beforeend", incorrectIcon);
    }

    if (Number(e.target.id) === props.quizAnswerIndex) {
      props.addPoint();
    }

    correctAnswer.className = "answer-choice correct";
    correctAnswer.insertAdjacentHTML("beforeend", correctIcon);

    props.hideNext();
  };

  let labels = ["A", "B", "C", "D"];
  return (
    <div>
      <img src={cardImage} className="card-img" alt="people"></img>
      <div className="card-container__inner">
        {props.quizFlagVersion ? questionA() : questionB()}

        <ul className="answer-choices">
          {props.questionSet.map((country, id) => (
            <li
              id={id}
              key={id}
              className="answer-choice"
              onClick={checkAnswer}
            >
              <span className="label">{labels[id]}</span> {country.name}{" "}
            </li>
          ))}
        </ul>
        {props.isAnswerPicked ? (
          <button className="nxt-btn" onClick={() => props.nextQuestion()}>
            Next
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Question;
