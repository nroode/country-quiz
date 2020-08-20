import React from "react";
import cardImage from "../assets/undraw_adventure.svg";

//Note - filter out countries without capitals? e.g., McDonald Isalnd? 
//Bug - if click on letter don't want it to turn red just full answer

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
    return (
      <div>
        <h2 className="question">{this.props.questionSet[this.props.quizAnswerIndex].capital} is the capital of ... ?</h2>
      </div>
    );
  }

  questionB() {
    return (
      <div>
        <img src={this.props.questionSet[this.props.quizAnswerIndex].flag} className="flag-img" alt="flag"></img>
        <h2 className="question">Which country does this flag belong to? </h2>
      </div>
    );
  }

  checkAnswer = (e) => {
    //check if IDs match 
    let correctAnswer = document.getElementById(this.props.quizAnswerIndex);
    let correctIcon = `<i class="material-icons">check_circle_outline</i>`
    let incorrectIcon = `<i class="material-icons">highlight_off</i>`


    if (Number(e.target.id) !== this.props.quizAnswerIndex) {
      let incorrectAnswer = e.target.closest(".answer-choice");
      incorrectAnswer.className = "answer-choice incorrect";
      incorrectAnswer.insertAdjacentHTML('beforeend', incorrectIcon)

    }  
    
    if (Number(e.target.id) === this.props.quizAnswerIndex) {
      this.props.addPoint();
    }
    

    correctAnswer.className = "answer-choice correct";
    correctAnswer.insertAdjacentHTML('beforeend', correctIcon)
        
    //display nextButton
    this.props.hideNext();

  }

  render() {
    let labels = ['A', 'B', 'C', 'D'];
    // console.log(this.props.quizFlagVersion);
    // console.log(this.props.quizAnswerIndex);
    return (
      <div>
      <img src={cardImage} className="card-img" alt="people"></img>
        <div className="card-container__inner">
          {this.props.quizFlagVersion
            ? this.questionA()
            : this.questionB()}

          <ul className="answer-choices">
            {this.props.questionSet.map((country, id) => (
              <li id={id} key={id} className="answer-choice" onClick={this.checkAnswer}><span className="label">{labels[id]}</span> {country.name} </li>
            ))}
          </ul>
          {this.props.isAnswerPicked ? 
          <button className="nxt-btn" onClick={() => this.props.nextQuestion()}>Next</button> :
          ''}
        </div>
      </div>
    );
  }
}

export default Question;
