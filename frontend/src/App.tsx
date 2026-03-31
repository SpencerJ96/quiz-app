import { useState, useEffect, useRef } from "react"
import type { Question } from "./types"
import QuizQuestion from "./QuizQuestion"
import QuizResults from "./QuizResults"
import QuizStart from "./QuizStart"
import QuizCategory from "./QuizCategory"

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
	const [timer, setTimer] = useState (15)
	const [selectedCategory, setSelectedCategory] = useState("")
	const [nameEntered, setNameEntered] = useState(false)

	useEffect(() => {
		if (selectedCategory === "") return
		async function fetchQuestions(){
				//Sends fetch to backend
			const questFetch = await fetch (`http://localhost:5220/api/questions?category=${selectedCategory}`)
				// store fetch and convert it to JS object
			const questResponse = await questFetch.json()
			setQuizStarted(true)
			//Set state of questions with the fetch 
			setQuestions(questResponse)
		}
		fetchQuestions() //call the function - state updates (setQuestions) questions appear
	},
	 	[selectedCategory])// useEffect on empty array = run on app load.

		function handleCategorySelect(category:string){
			setSelectedCategory(category)
		}

		// ** AUDIO  AND PLAYER AFTER START ** // 
		//Create a ref(box to hold value and doesnt change on re-render) 
		// < > tells TS What this may hold, either audio element or nothing
		const quizAudioRef = useRef<HTMLAudioElement | null> (null)

		function handleStart (name : string){
			quizAudioRef.current = new Audio ("/audio/Millionaire.mp3")
			quizAudioRef.current.volume = 0.4
			quizAudioRef.current.play()

			setName(name)
			setNameEntered(true)
		}

		useEffect( () =>{
			if (!quizStarted) return //Prevents counter from starting if quiz hasnt started
			setTimer(15)    // Reset Timer to 15 everytime currentIndex Changes 
			const interval = setInterval(() => {
				setTimer(prev => prev - 1) // Use functional form to countdown instead of timer to prevent stale closure of the state
			},1000)
			return () => clearInterval(interval)
		},[currentIndex, quizStarted]) // Needs to listen for changes to quizstarted too so it runs when the boolean changes

			//if timer hits 0, force incorrect answer and reset timer state
		useEffect ( () => {
			if (timer === 0){
				handleAnswer(-1)
				setTimer(15)
			}
		},[timer, quizStarted])

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
				}
				
				setTimeout(() => {
  			  if (currentIndex === questions.length - 1) {
       			 setQuizFinished(true)
       			 saveScore(name, newScore)
  			  } else {
     			   setSelectedIndex(null)
      			  setCurrentIndex(currentIndex + 1)
    }
}, 1000)}



		function saveScore(name: string, score:number){
			
						//Tell TS the properties of each item in array   //"scores" is either empty array on first run or what previously was saved by .setItem
			const existing: {name:string, score:number}[] = JSON.parse(localStorage.getItem("scores") || "[]")
				existing.push( {name, score} ) //add name and score to the array
			const updated = existing.sort ((a,b) => b.score - a.score).slice(0,5) // Sort by highest. give top 5
			localStorage.setItem("scores", JSON.stringify(updated)) //In local storage set "Scores" to the updated sorted array
		}

	    function handleRestart (){
			setScore(0)
			setQuizFinished(false)
			setCurrentIndex(0)
			setSelectedIndex(null)
			setQuizStarted(false)
			
			
			quizAudioRef.current = new Audio ("/audio/Millionaire.mp3")
			quizAudioRef.current.volume = 0.3
			quizAudioRef.current.play()
			
		}
		
	return( 
		<div className="min-h-screen bg-purple-950 flex items-center justify-center">
		{
		!nameEntered ? <QuizStart onStart={handleStart} />
		:
		nameEntered && !quizStarted ? <QuizCategory onCategorySelect={handleCategorySelect} />
		:
		questions.length === 0 ? <div>Loading....</div>
		:
		quizFinished ? <QuizResults score ={score} total={questions.length} onRestart={handleRestart} name={name}/>
		:
		<QuizQuestion question = {questions[currentIndex]} onAnswer={handleAnswer} selectedIndex={selectedIndex}
						questionNumber = {currentIndex} questionTotal = {questions.length} timer={timer}/>
		}
		</div>

	)
}

export default App