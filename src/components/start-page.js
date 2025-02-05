import React from "react"

export default function Start(props) {
    return(
        <div className="start-page">
            <h1 className="start-page-title">Movie Buff Quiz</h1>
            <p className="start-page-description">From Blockbusters To Indie Films</p>
            <button className="start-page-button" onClick={props.quiz}>Start quiz</button>
        </div>
    )
}