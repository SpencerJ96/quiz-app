import {  useState, useRef } from "react";

interface QuizStartProps {
	onStart : (name:string) => void
}




function QuizStart (props:QuizStartProps){
	const [name, setName] = useState("")
	const audioRef = useRef<HTMLAudioElement | null> (null)

	function audioStart () {
		if (audioRef.current === null) 
			{	audioRef.current = new Audio ("/audio/Intro.mp3")
				audioRef.current.volume = 0.3
				audioRef.current.play()
			}
		
	}

	return (
		<div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl text-center">
		<h1 className="text-3xl font-bold text-purple-900 mb-6">Alices BIG Eurovision Quiz</h1>

		<input placeholder="Enter Your Name..." className="w-full border-2 border-purple-300 rounded-xl px-4 py-3 mb-6 text-purple-900 focus:outline-none focus:border-purple-600"
		 onChange = {(e) => { 
			const lettersOnly = e.target.value.replace (/[^a-zA-Z ]/g, "") //Replace any char that isnt a letter or space with nothing
														// ^ "NOT" a-zA-Z means any letter "_SPACE_" Allow spaces "G" means apply to entire string
			if (lettersOnly.length <20) { setName(lettersOnly)}
			audioStart()
			}}/>

		<button disabled={name.length === 0} className="w-full bg-yellow-400 hover:bg-yellow-300 text-purple-900 font-semibold py-3 px-4 rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
		onClick={() => {
			audioRef.current?.pause()
			props.onStart(name)
		}}>Ready To Start?</button>



		</div>
	)
}

export default QuizStart