import React from "react";
import "./App.scss";
import Question from "./Components/Question";
import Home from "./Components/Home";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      error: null,
      isLoaded: false,
      items: [],
      countrySelects: [],
      correctAnswers: 0,
    };
  }

  // .capital  .flag  .name

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result[0]);
          this.setState({
            isLoaded: true,
            items: result.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    this.resetQuizData();
  }

  resetQuizData() {
    var countrySelects = [];
    //randomly select 24 countries
    for (var i = 0; i < 24; i++) {
      var r = Math.floor(Math.random() * 250);
      if (countrySelects.indexOf(r) === -1) countrySelects.push(r);
    }
    this.setState({ countrySelects });
  }

  startQuiz() {
    this.setState({
      home: false,
    });
  }

  //either start page, question, or results

  render() {
    console.log(this.state.countrySelects);
    return (
      <div className="App">
        <h1>Country Quiz</h1>
        <div className="card-container">
          {this.state.home ? (
            <Home startQuiz={() => this.startQuiz()} />
          ) : (
            <Question />
          )}
        </div>
      </div>
    );
  }
}

export default App;
