import { useState, useEffect } from "react"
import type { Question } from "./types"
import QuizQuestion from "./QuizQuestion"
import QuizResults from "./QuizResults"

function App () {
		/* *STATE DECLARATIONS */
									//* TYPE CHECK * Pass in the Questions interface 
	const [questions, setQuestions] = useState<Question[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [score, setScore] = useState(0)
	const [quizFinished, setQuizFinished] = useState(false)

	useEffect(() => {
		async function fetchQuestions(){
				//Sends fetch to backend
			const questFetch = await fetch ("http://localhost:5220/api/questions")
				// store fetch and convert it to JS object
			const questResponse = await questFetch.json()
			//Set state of questions with the fetch 
			setQuestions(questResponse)
		}
		fetchQuestions() //call the function - state updates (setQuestions) questions appear
	},
	 	[])// useEffect on empty array = run on app load.
		
		
		function handleAnswer (index: number) {
		if (index === questions[currentIndex].correctIndex){
			setScore(score + 1)
		}

		if (currentIndex === questions.length -1 ){
			setQuizFinished(true)
		} else {
			setCurrentIndex(currentIndex +1)
		} 

	}

	    function handleRestart (){
			setScore(0)
			setQuizFinished(false)
			setCurrentIndex(0)
		}
		
	
	
	return( 
		<div className="min-h-screen bg-purple-950 flex items-center justify-center">
		{questions.length === 0 ? <div>Loading....</div>
		:
		quizFinished ? <QuizResults score ={score} total={questions.length} onRestart={handleRestart}/>
		:
		<QuizQuestion question = {questions[currentIndex]} onAnswer={handleAnswer} />}
		</div>

	)
}

export default App