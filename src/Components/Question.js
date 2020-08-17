import React from "react";

//Note - filter out countries without capitals? e.g., McDonald Isalnd? 

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
    console.log(this.props.quizAnswerIndex)
    return (
      <div>
        <img src={this.props.questionSet[this.props.quizAnswerIndex].flag} width="200"></img>
        <h2>{this.props.questionSet[this.props.quizAnswerIndex].capital} is the capital of ... ?</h2>
      </div>
    );
  }

  questionB() {
    console.log(this.props.questionSet[this.props.quizAnswerIndex].flag)
    return (
      <div>
        <img src={this.props.questionSet[this.props.quizAnswerIndex].flag} width="200"></img>
        <h2>Which country does this flag belong to? </h2>
      </div>
    );
  }

  render() {
    console.log(this.props.quizQuestionVersion);
    
    return (
      <div>
        <div className="card-container">
          {this.props.quizQuestionVersion === "capital"
            ? this.questionA()
            : this.questionB()}

          <ul>
            {this.props.questionSet.map((country) => (
              <li> {country.name} </li>
            ))}
          </ul>
          <button onClick={() => this.props.nextQuestion()}>Next</button>
        </div>
      </div>
    );
  }
}

export default Question;
