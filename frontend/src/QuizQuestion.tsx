import type { Question } from "./types";

interface QuizQuestionProps {
	question : Question
	onAnswer: ( index : number ) => void
	selectedIndex: number | null
	questionNumber: number
	questionTotal: number
	timer: number
}
// Defining question as our Question interface lets us pull out pieces of it like .text and .answers


//Question and buttons appear on screen
//Go through each item in the answers array and pull it out and its index 
// you could call it anything .map just gives you each item in the array
// one by one we'll call it answer while we work with it 
//For each item in the array(map) create a button and put the {answer} inside it
// On click, call the function that app passed down with the button that was clicked
// "Tell app what the user picked"
function QuizQuestion (props: QuizQuestionProps){
	return(
		<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl">

		<div className="text-sm font-semibold text-purple-400 mb-2"> {props.questionNumber + 1 } Out Of {props.questionTotal} {props.timer}</div>

		<div className="text-2xl font-bold text-purple-900 mb-6">{props.question.text}</div>
		{props.question.answers.map((answer, index)  => {
				const buttonClass = props.selectedIndex === null ? "w-full block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"
							//Correct answer					
					: index === props.question.correctIndex ? "w-full block bg-green-500 hover:bg-green-500 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"
							//Incorrect answer
					: index === props.selectedIndex  ? "w-full block bg-red-500 hover:bg-red-500 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"
							//Neither correct nor selected
					: "w-full block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"

			return (
			
			<button className={buttonClass}
			 key={index} onClick={() => props.onAnswer(index)}>{answer}</button>
			)
			})}

		</div>

	)
}


export default QuizQuestion