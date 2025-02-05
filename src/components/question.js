import React from "react";
import he from "he";

function Question(props) {
  function createOptions() {
    const optionElements = (props.options || []).map((option, optionIndex) => (
      <button
        key={optionIndex}
        className={`question-button ${buttonColor(
          props.readyForCheck,
          option.isSelected,
          option.isCorrect
        )}`}
        onClick={() => props.select(optionIndex)}
      >
        {he.decode(option.value)}
      </button>
    ));
    return optionElements;
  }

  function buttonColor(readyForCheck, isSelected, isCorrect) {
    if (!readyForCheck) {
      return isSelected ? "selected" : "";
    } else if (readyForCheck) {
      if (isCorrect) {
        return "true";
      } else {
        return isSelected ? "false" : "result";
      }
    }
  }

  return (
    <div className="question">
      <h1 className="question-title">{he.decode(props.question)}</h1>
      <div className="question-buttons-container">{createOptions()}</div>
      <hr />
    </div>
  );
}

export default React.memo(Question);
