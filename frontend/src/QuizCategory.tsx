interface QuizCategoryProps{
	onCategorySelect: (catagory: string) => void
}

function QuizCategory (props: QuizCategoryProps){
 return (
<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl text-center">
		
		<h1 className="text-3xl font-bold text-purple-900 mb-6"> Select A Categories </h1>
		<button className="w-full block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"
 onClick={() => props.onCategorySelect("general")}>General</button>
		<button className="w-full block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"
 onClick={() => props.onCategorySelect("winners")}>Winners</button>
		<button className="w-full block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"
 onClick={() => props.onCategorySelect("year")}>Name That Year</button>
		<button className="w-full block bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl mb-3 cursor-pointer"
 onClick={() => props.onCategorySelect("country")}>Who Did I Represent?</button>
		
</div>
 )
}

export default QuizCategory