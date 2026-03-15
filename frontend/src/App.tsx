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
	const [selectedIndex, setSelectedIndex] = useState <number | null>(null)

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
		
		
		//Function expects a number and we'll call it index while we work with it
		function handleAnswer (index:number){

			// * BUG FIX * 
			// State updates are ASYNCHRONOUS. If you call setScore + 1 score doesnt change until next render
			// when QuizResult comp renders score still has the old value so shows an incorrect score
			// By using a plain variable it can update instantly so newScore is always correct. 
			const newScore = index === questions[currentIndex].correctIndex ? score + 1 : score
					//If the index recieved is = to the current questions correct index
					//Update score state
			
					//Tracks users click to change button colour 
					setSelectedIndex(index)


			if (
				index === questions[currentIndex].correctIndex) {
					setScore(newScore)
				} if (			//if the current question number is === the array length -1 end quiz
					currentIndex === questions.length - 1) {
						setQuizFinished(true)
					} else {
						setSelectedIndex(null)
						setCurrentIndex(currentIndex + 1)
					} 
						
		}

	    function handleRestart (){
			setScore(0)
			setQuizFinished(false)
			setCurrentIndex(0)
			setSelectedIndex(null)
		}
		
	return( 
		<div className="min-h-screen bg-purple-950 flex items-center justify-center">
		{questions.length === 0 ? <div>Loading....</div>
		:
		quizFinished ? <QuizResults score ={score} total={questions.length} onRestart={handleRestart}/>
		:
		<QuizQuestion question = {questions[currentIndex]} onAnswer={handleAnswer} selectedIndex={selectedIndex}
						questionNumber = {currentIndex} questionTotal = {questions.length}/>}
		</div>

	)
}

export default App