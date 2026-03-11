import { useState, useEffect } from "react"
import type { Question } from "./types"

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
	 	[]) // useEffect on empty array = run on app load.
		return <div>Quiz Loading...</div>




}

export default App