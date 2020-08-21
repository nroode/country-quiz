import React from "react";
import cardImage from "../assets/undraw_adventure.svg";

const Home = (props) => (
            <div className="home-card">
                <img src={cardImage} className="card-img" alt="people"></img>
                <h2>Quiz yourself by identifying country capitals and flags!</h2>
                <button className="start-btn" onClick={props.startQuiz}>Start!</button>
            </div>
)

export default Home;