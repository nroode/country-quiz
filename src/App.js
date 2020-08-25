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
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        if (this._isMounted) {
          const countryData = res.data;
          this.setState({
            error: false,
            countryData,
            isLoading: false,
          });
        } else {
          this.setState({
            error: true,
            isLoading: false,
          });
        }
      })
      .catch((err) => {
        this.setState({
          error: true,
          isLoading: false,
        });
      });
  }

  startQuiz = () => {
    this.setState({
      home: false,
      quizPage: 1,
      quizCorrectAnswers: 0,
    });

    this.resetQuizData();
  };

  resetQuizData = () => {
    var countrySelects = [];
    while (countrySelects.length < 24) {
      var r = Math.floor(Math.random() * 250);
      //make sure country isn't included already
      if (countrySelects.indexOf(r) === -1) countrySelects.push(r);
    }
    this.setState({ countrySelects });
    this.getQuizData(countrySelects);
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  getQuizData = (countrySelects) => {
    //filter the quizData
    let quizSelects = countrySelects;
    let quizData = [];
    console.log(quizSelects);

    //in all the data, find the country whose index matches the value in the selects list
    for (var i = 0; i < quizSelects.length; i++) {
      
        let item = this.state.countryData.find((el, j) => quizSelects[i] === j)
        quizData.push(item);
    }

    this.setState({ quizData });
    this.renderPage(quizData, 1);
  };

  hideNext = () => {
    this.setState({ isAnswerPicked: true });
  };

  addPoint = () => {
    this.setState((prevState) => ({
      quizCorrectAnswers: prevState.quizCorrectAnswers++,
    }));
  };

  nextQuestion = () => {
    this.setState((prevState) => ({
      isAnswerPicked: false,
      quizFlagVersion: !prevState.quizFlagVersion,
    }));

    //clear any right/wrong colors and icons for next question
    let choices = document.querySelectorAll(".answer-choice");
    let choiceIcons = document.querySelectorAll(".material-icons");

    choices.forEach((item) => (item.className = "answer-choice"));
    choiceIcons.forEach((choice) => choice.remove());

    console.log(this.state.quizData, this.state.quizPage);

    this.renderPage(this.state.quizData, this.state.quizPage);
  };

  renderPage = (quizData, page = this.state.quizPage, questionsPerPage = 4) => {
    console.log(quizData);
    console.log(page);
    const start = (page - 1) * questionsPerPage;
    const end = questionsPerPage * page;

    let questionSet = quizData.slice(start, end);
    console.log(questionSet);

    var quizAnswerIndex = Math.floor(Math.random() * 4);
    this.setState({ questionSet, quizAnswerIndex });
    this.setState((prevState) => ({ quizPage: prevState.quizPage+ 1 }));
  };

  render() {
    const { quizAnswerIndex, quizFlagVersion, questionSet, isAnswerPicked, quizCorrectAnswers } = this.state;
    return (
      <div className="App">
        <div>
          <h1>Country Quiz</h1>
          <div className="card-container">
            {this.state.home ? (
              <Home startQuiz={() => this.startQuiz()} />
            ) : this.state.quizPage <= 7 ? (
              <Question
                quizAnswerIndex={quizAnswerIndex}
                quizFlagVersion={quizFlagVersion}
                questionSet={questionSet}
                nextQuestion={this.nextQuestion}
                isAnswerPicked={isAnswerPicked}
                hideNext={this.hideNext}
                addPoint={this.addPoint}
              />
            ) : (
              <Results
                quizCorrectAnswers={quizCorrectAnswers}
                resetQuizData={this.resetQuizData}
                startQuiz={this.startQuiz}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
