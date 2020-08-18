import React from "react";

//Note - filter out countries without capitals? e.g., McDonald Isalnd? 

//make API call by country's name
//6*4 -- store 24 random countrys in state
//take first 4 countries, show capital of one

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  //set question type - capital or flag question
  //

  //cycle through questions in groups of 4

  questionA() {
    console.log(this.props.quizAnswerIndex)
    return (
      <div>
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

  checkAnswer = (e) => {
    //check if IDs match 

    console.log(Number(e.target.id));
    console.log(this.props.quizAnswerIndex);

    if (Number(e.target.id) !== this.props.quizAnswerIndex) {
      e.target.className = "answer-choice incorrect";
    } 
    
    let correctAnswer = document.getElementById(this.props.quizAnswerIndex);
    correctAnswer.className = "answer-choice correct";
        
    //display nextButton
    this.props.hideNext();

  }

  render() {
    // console.log(this.props.quizQuestionVersion);
    // console.log(this.props.quizAnswerIndex);
    return (
      <div>
        <div className="card-container__inner">
          {this.props.quizQuestionVersion === "capital"
            ? this.questionA()
            : this.questionB()}

          <ul className="answer-choices">
            {this.props.questionSet.map((country, id) => (
              <li id={id} key={id} className="answer-choice" onClick={this.checkAnswer}> {country.name} </li>
            ))}
          </ul>
          {this.props.isAnswerPicked ? 
          <button onClick={() => this.props.nextQuestion()}>Next</button> :
          ''}
        </div>
      </div>
    );
  }
}

export default Question;
