import React from "react";
import "./App.scss";
import Question from "./Components/Question";
import Home from "./Components/Home";
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
      quiz: {
        page: 1,
        questionVersion: 'capital',
        correctIndex: 0,
        correctAnswers: 0,
      }
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
          console.log(countryData);
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

  resetQuizData() {
    var countrySelects = [];
    //randomly select 24 indices
    while (countrySelects.length < 24) {
      var r = Math.floor(Math.random() * 250);
      if (countrySelects.indexOf(r) === -1) countrySelects.push(r);
    }
    this.setState({ countrySelects });
    this.getQuizData(countrySelects);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  getQuizData(countrySelects) {
   
    //filter the quizData 
    let quizSelects = countrySelects;
    let quizData = [];
    // this.state.countryData.filter((country, i) => this.state.countrySelects.indexOf(i) > -1);
    //in all the data, find the country whose index matches the value in the selects list
    for (var i = 0; i < quizSelects.length; i++) {
      quizData.push(this.state.countryData.find((el, j) => quizSelects[i] === j))
    }
    // console.log(quizData);
    // this.setState({ quizData });
    // console.log(this.state.quizData);

    this.setState({ quizData });
    this.renderPage(quizData);
    // this.renderPage(quizData);


    // if(this.state.quizData !== quizData){
    //   console.log('not equal')
    //   this.setState({ quizData });
    // }
   
    // if (this.state.quizData !== quizData) {
    //   this.setState({ quizData })
    //   console.log('set quiz data')
    // }
    // console.log(this._isMounted);
    // if (this._isMounted) {
    //   this.setState({ quizData })
    //   console.log('is mounted')
    // }
    
  }


  startQuiz() {
    this.setState({
      home: false,
    });
    // console.log(this.state.quizData);
    this.resetQuizData();
    

  }

  //either start page, question, or results

  renderPage = (quizData, page = this.state.quiz.page, questionsPerPage = 4) => {
    console.log(quizData);
    const start = (page - 1) * questionsPerPage;
    const end = questionsPerPage * page;

    let questionSet = quizData.slice(start, end);
    this.setState({ questionSet })
    // quizData.map(answer => <ol><li> {answer.name} </li></ol>)
    // console.log(countryList.slice(start, end));

  };

  //user clicks an answer

  //if correct, correct answer shows as green and next button appears 

  //if incorrect, correct answer shows as green, incorrect shows as red


  render() {
    return (
      <div className="App">
        <h1>Country Quiz</h1>
        <div className="card-container">
          {this.state.home ? (
            <Home startQuiz={() => this.startQuiz()} />
          ) : (
            <Question 
            quizData={this.state.quizData}
            renderPage={this.renderPage}
            quiz={this.state.quiz}
            questionSet={this.state.questionSet}
             />
          )}
        </div>
      </div>
    );
  }
}

export default App;
