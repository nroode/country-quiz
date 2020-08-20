import React from "react";
import "./App.scss";
import Question from "./Components/Question";
import Home from "./Components/Home";
import Results from "./Components/Results";
import axios from "axios";

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = {
      home: true,
      error: null,
      isLoaded: false,
      items: [],
      countrySelects: [],
      countryData: [],
      quizData: [],
      questionSet: [],
      quizFlagVersion: true,
      quizPage: 1,
      quizAnswerIndex: 0,
      quizCorrectAnswers: 0,
      isAnswerPicked: false,
    };
  }


  componentDidMount() {
    this._isMounted = true;
    console.log(this._isMounted);
      axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res => {
        if (this._isMounted) {
          const countryData = res.data;
          // console.log(countryData);
          this.setState({
            error: false,
            countryData,
            isLoading: false
          });
        } else {
          this.setState({
            error: true,
            isLoading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          error: true,
          isLoading: false
        });
      });

    // this.resetQuizData();
  }

  startQuiz = () => {
    this.setState(({
      home: false,
      quizPage: 1,
      quizCorrectAnswers: 0,
    }));

    this.resetQuizData();
  }

  resetQuizData = () => {
    var countrySelects = [];
    //randomly select 24 indices
    while (countrySelects.length < 24) {
      var r = Math.floor(Math.random() * 250);
      //make sure country isn't included already 
      if (countrySelects.indexOf(r) === -1) countrySelects.push(r);
    }

    // console.log(countrySelects);

    this.setState({ countrySelects});
    this.getQuizData(countrySelects);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getQuizData = (countrySelects) => {
   
    //filter the quizData 
    let quizSelects = countrySelects;
    let quizData = [];
   
    //in all the data, find the country whose index matches the value in the selects list
    for (var i = 0; i < quizSelects.length; i++) {
      quizData.push(this.state.countryData.find((el, j) => quizSelects[i] === j))
    }
  
    this.setState({ quizData });
    this.renderPage(quizData, 1);

  }


  //either start page, question, or results

  renderPage = (quizData, page = this.state.quizPage, questionsPerPage = 4) => {

    const start = (page - 1) * questionsPerPage;
    const end = questionsPerPage * page;

    let questionSet = quizData.slice(start, end);

    var quizAnswerIndex = Math.floor(Math.random() * 4);
    console.log(quizAnswerIndex);

    console.log(this.state.quizPage);
    this.setState({ questionSet, quizAnswerIndex });
   
    this.setState(prevState => ({ quizPage: prevState.quizPage++ }));
    
  };

  hideNext = () => {
    this.setState({ isAnswerPicked: true })
  }

  addPoint = () => {
    this.setState( prevState => ({ quizCorrectAnswers: prevState.quizCorrectAnswers++ }));
  }

  nextQuestion = () => {
    
    //remove next button
    this.setState( prevState => ({ isAnswerPicked: false, quizFlagVersion: !prevState.quizFlagVersion }));

    //clear any right/wrong colors
    let choices = document.querySelectorAll('.answer-choice');
    let choiceIcons = document.querySelectorAll('.material-icons');
    
    choices.forEach(item => item.className = "answer-choice");
    choiceIcons.forEach(choice => choice.remove());

    this.renderPage(this.state.quizData, this.state.quizPage );
  }


  render() {
    return (
      <div className="App">
        <h1>Country Quiz</h1>
        <div className="card-container">
        
          {this.state.home ? (
            <Home startQuiz={() => this.startQuiz()} />
          ) : this.state.quizPage <= 7 ? (
            <Question 
            quizData={this.state.quizData}
            renderPage={this.renderPage}
            quizAnswerIndex={this.state.quizAnswerIndex}
            quizFlagVersion={this.state.quizFlagVersion}
            questionSet={this.state.questionSet}
            quizPage={this.state.quizPage}
            nextQuestion={this.nextQuestion}
            isAnswerPicked={this.state.isAnswerPicked}
            hideNext={this.hideNext}
            addPoint={this.addPoint}
             />) : <Results
             quizCorrectAnswers={this.state.quizCorrectAnswers}
             resetQuizData={this.resetQuizData}
             startQuiz={this.startQuiz}
             />
        }
        </div>
      </div>
    );
  }
}

export default App;
