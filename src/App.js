import React from "react"
import Start from "./components/start-page"
import Quiz from "./components/quiz-page"

export default function App() {

const [page, setPage] = React.useState(<Start quiz={quizPage}/>)

function quizPage() {
  setPage(<Quiz />);
  window.scrollTo(0, 0)
}

  return(
  <div>{page}</div>
  )
}