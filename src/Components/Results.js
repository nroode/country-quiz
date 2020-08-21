import React from "react";
import resultsImage from "../assets/undraw_winners.svg";

class Results extends React.Component {

    render() {
        return (
            <div className="results-card">
            <img alt="winner img" src={resultsImage}></img>
            <h2>Results</h2>
            <p>You got <span className="correct-count">{this.props.quizCorrectAnswers}</span> correct answers</p>
            <button onClick={() => this.props.startQuiz()}>Try again</button>
            </div>
        )
    }

}

export default Results;