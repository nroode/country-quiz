import React from "react";
import cardImage from "../assets/undraw_adventure.svg";

const Home = (props) => (
            <div>
                <img src={cardImage} className="card-img" alt="people"></img>
                <button className="start-btn" onClick={props.startQuiz}>Start!</button>
            </div>
)

export default Home;