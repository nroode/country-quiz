import React from "react";

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


  render() {
    
    return (
      <div>
        <div className="card-container">
          <h2>question</h2>
          <ol>
            <li>answer 1</li>
            <li>answer 2</li>
            <li>answer 3</li>
            <li>answer 4</li>
          </ol>
        </div>
      </div>
    );
  }
}

export default Question;
