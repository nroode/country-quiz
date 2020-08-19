import React from "react";
import resultsImage from "../assets/undraw_winners.svg";

class Results extends React.Component {

    render() {
        return (
            <div>
            <img alt="winner img" src={resultsImage}></img>
            <h2>Results</h2>
            <p>You got 4 correct answers</p>
            <button>Try again</button>
            </div>
        )
    }

}

export default Results;