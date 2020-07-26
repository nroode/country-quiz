import React from "react";

//make API call by country's name
//6*4 -- store 24 random countrys in state
//take first 4 countries, show capital of one

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  //set question type - capital or flag question
  //

  //cycle through questions in groups of 4

  questionA() {
    return (
      <div>
        <img src={this.props.questionSet[0].flag} width="200"></img>
        <h2>{this.props.questionSet[0].capital} is the capital of ... ?</h2>
      </div>
    );
  }

  questionB() {
    return (
      <div>
        <img src={this.props.questionSet[0].flag} width="200"></img>
        <h2>Which country does this flag belong to? </h2>
      </div>
    );
  }

  render() {
    console.log(this.props.quizData);
    return (
      <div>
        <div className="card-container">
          {this.props.quiz.questionVersion === "capital"
            ? this.questionA()
            : this.questionB()}

          <ul>
            {this.props.questionSet.map((country) => (
              <li> {country.name} </li>
            ))}
          </ul>
          <button onClick={() => this.props.renderPage(this.props.quizData)}>Next</button>
        </div>
      </div>
    );
  }
}

export default Question;
