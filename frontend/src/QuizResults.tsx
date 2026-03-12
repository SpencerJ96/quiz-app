interface QuizResultsProps {
	score : number
	total : number
}


function QuizResults ( props: QuizResultsProps ){
	return <div>{props.score} Out of {props.total}</div>
	
	
}

export default QuizResults