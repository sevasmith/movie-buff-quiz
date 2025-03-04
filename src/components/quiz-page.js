import React from "react";
import Question from "./question";

export default function Quiz() {
  const [newData, setNewData] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [readyForCheck, setReadyForCheck] = React.useState(false);

  async function fetchQuestions() {
    try {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"
      );
      const apiData = await response.json();
      const rawOptions = apiData.results.map((item) => [
        {
          value: item.correct_answer,
          isCorrect: true,
          isSelected: false,
        },
        ...item.incorrect_answers.map((answer) => ({
          value: answer,
          isCorrect: false,
          isSelected: false,
        })),
      ]);

      const tossedOptions = rawOptions.map((options) =>
        options
          .map((option) => ({ ...option, sortKey: Math.random() }))
          .sort((a, b) => a.sortKey - b.sortKey)
      );

      setOptions(tossedOptions);
      setNewData(apiData.results);
    } catch (error) {
      console.error("Error fetching data:", error);
      fetchQuestions();
    }
  }

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  function resetQuiz() {
    fetchQuestions();
    setOptions([]);
    setNewData([]);
    setReadyForCheck(false);
    window.scrollTo(0, 0)
  }

  const questionElements = newData.map((item, questionIndex) => (
    <div>
      <Question
        key={item.question}
        question={item.question}
        options={options[questionIndex]}
        select={(optionIndex) => select(questionIndex, optionIndex)}
        readyForCheck={readyForCheck}
      />
    </div>
  ));

  function select(questionIndex, optionIndex) {
    if (readyForCheck) {
      return undefined;
    } else {
      setOptions((oldOptions) =>
        oldOptions.map((options, qIndex) => {
          if (qIndex === questionIndex) {
            return options.map((option, oIndex) => {
              if (oIndex === optionIndex) {
                return { ...option, isSelected: true };
              } else {
                return { ...option, isSelected: false };
              }
            });
          } else {
            return options;
          }
        })
      );
    }
  }

  const numberOfCorrectAnswers = options
    .flat()
    .filter((option) => option.isCorrect && option.isSelected).length;

  const pageLoader = (
    <div className="page-loader-container">
      <div className="page-loader"></div>
    </div>
  );

  if (newData.length === 0) {
    return (pageLoader)
  }

  return (
    <div>
      {questionElements}
      <div className="quiz-page-button-container">
        {readyForCheck && (
          <p className="scored-answers-text">
            You&nbsp;scored {numberOfCorrectAnswers}/{options.length} correct&nbsp;answers
          </p>
        )}
        <button
          className="quiz-page-button"
          onClick={readyForCheck ? resetQuiz : () => setReadyForCheck(true)}
        >
          {readyForCheck ? "Play\u00A0again" : "Check\u00A0answers"}
        </button>
      </div>
    </div>
  );
}
