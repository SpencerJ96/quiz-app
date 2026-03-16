interface QuizResultsProps {
	score : number
	total : number
	onRestart : () => void
	name : string
}


function QuizResults ( props: QuizResultsProps ){
	let message =""
	if (props.score === props.total){
		message = "🏆PERFECT SCORE!🏆"
	} else if (props.score >= props.total / 2){
		message = "Not bad🎵"
	} else {
		message = "Better luck next time 🎤"
	}
	
	
	return (
		<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl text-center">	
			<h1 className="text-3xl font-bold text-purple-900 mb-4">🏆 Eurovision Quiz </h1>
			<p className="text-gray-600 text-lg mb-2">{props.name} You Scored...</p>
	<div className="text-5xl font-bold text-yellow-500 mb-6">{props.score} Out of {props.total}</div>
			<p>{message}</p>
			<button className="w-full block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer" 
			onClick={() => props.onRestart()}> Play again? </button>
	</div>

	)
}

export default QuizResults