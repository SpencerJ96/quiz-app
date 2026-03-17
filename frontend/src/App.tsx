import { useState, useEffect, useRef } from "react"
import type { Question } from "./types"
import QuizQuestion from "./QuizQuestion"
import QuizResults from "./QuizResults"
import QuizStart from "./QuizStart"

function App () {
		/* *STATE DECLARATIONS */
									//* TYPE CHECK * Pass in the Questions interface 
	const [questions, setQuestions] = useState<Question[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [score, setScore] = useState(0)
	const [quizFinished, setQuizFinished] = useState(false)
	const [selectedIndex, setSelectedIndex] = useState <number | null>(null)
	const [quizStarted, setQuizStarted] = useState (false)
	const [name, setName] = useState ("")

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

						// ** AUDIO ARRAY AND PLAYER AFTER START ** // 
		//Create a ref(box to hold value)
		// < > tells TS What this may hold, either audio element or nothing
		const quizAudioRef = useRef<HTMLAudioElement | null> (null)

		function handleStart (name : string){
			const audioArray = ["/audio/Johnny Logan.mp3", "/audio/ChaChaCha.mp3", "/audio/Kuula.mp3"]
								//Use math object
								//Floor = round down to nearest whole number
								//random = generate random decimal
								//Times the random decimal by the length or the array round down answer
								// e.g random = 0.73. --- multiply by 3 = 2.19 ---- Round down = 2
								//Round is needed because array indexes MUST BE WHOLE numbers. 
			const randomIndex = Math.floor(Math.random() * audioArray.length) 
			quizAudioRef.current = new Audio(audioArray[randomIndex])
			quizAudioRef.current.volume = 0.3
			//Take whats currently in the audioRef and store a new audio player with the randomIndex from audioArray
			quizAudioRef.current.play()

			setName(name)
			setQuizStarted(true)
		}

		useEffect( () => {
			if (quizFinished === true){
				quizAudioRef.current?.pause()
			}
			console.log(quizFinished)
		}, [quizFinished])

		//Function expects a number
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
			
			const audioArray = ["/audio/Johnny Logan.mp3", "/audio/ChaChaCha.mp3", "/audio/Kuula.mp3"]
			const randomIndex = Math.floor (Math.random() * audioArray.length)
			quizAudioRef.current = new Audio(audioArray[randomIndex])
			quizAudioRef.current.volume = 0.3
			quizAudioRef.current.play()
			
		}
		
	return( 
		<div className="min-h-screen bg-purple-950 flex items-center justify-center">
		{
		!quizStarted ? <QuizStart onStart={handleStart} />
		:
		questions.length === 0 ? <div>Loading....</div>
		:
		quizFinished ? <QuizResults score ={score} total={questions.length} onRestart={handleRestart} name={name}/>
		:
		<QuizQuestion question = {questions[currentIndex]} onAnswer={handleAnswer} selectedIndex={selectedIndex}
						questionNumber = {currentIndex} questionTotal = {questions.length}/>
		}
		</div>

	)
}

export default App