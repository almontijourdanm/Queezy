import { useEffect, useState } from "react"
import { useLocation, useNavigate, } from "react-router"
// import questionsData from '../helpers/Quizdata'
import QuestionCard from "../components/questioncard";



export default function Gamepage() {

    const questionsData = {
        "General Knowledge": [
            {
                question: "What is the capital of France?",
                options: ["Berlin", "Madrid", "Paris", "Lisbon"],
                correct_answer: "Paris",
            },
            {
                question: "Who wrote 'Hamlet'?",
                options: ["Shakespeare", "Hemingway", "Tolstoy", "Orwell"],
                correct_answer: "Shakespeare",
            },
        ],
        "Science": [
            {
                question: "What planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Venus"],
                correct_answer: "Mars",
            },
            {
                question: "What is the chemical symbol for water?",
                options: ["O2", "H2O", "CO2", "NaCl"],
                correct_answer: "H2O",
            },
        ],
    };


    const nav = useNavigate()
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const category = queryParams.get('category') || "General Knowledge"
    const room = queryParams.get('room') || "room1"

    const [questions, setQuestions] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => { 
        if(questionsData[category]){
            setQuestions(questionsData[category])
        } else {
            alert ('invalid category! redirecting to lobby...')
            nav('/lobby')
        }
    }, [category,nav])  


    // async function fetchQuestions() {
    //     try {
    //         let { data } = await axios({
    //             method: 'GET',
    //             url: `http://localhost:3000/gemini-generat`,
    //             headers: {
    //                 Authorization: `Bearer ${localStorage.getItem('access_token')}`
    //             }
    //         })

    //         setQuestions(data)
    //         setLoading(false)

    //     } catch (error) {
    //         console.log(error, "ini error<><><");

    //     }

    // }

    // fetchQuestions()

    // useEffect(() => {
    //     fetchQuestions()
    // }
    //     , [category])

    function handleAnswer(selectedOption) {

        if (selectedOption === questions[currentQuestionIndex].correct_answer) {
            setScore(score + 1)
            alert("Correct Answer!")

        } else {
            alert("Wrong Answer!")
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
            }
            else {
                alert(`Game Over! Your Score: ${score + 1} / ${questions.length}`)
                nav('/lobby')
            }
        }, 1000)
    }

    // if (loading) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen text-xl font-bold text-cyan-400">
    //             Loading Quiz...
    //         </div>
    //     )
    // }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold text-cyan-400 mb-4">
                Room: {room} | Category: {category}
            </h1>
            {questions.length > 0 && (
                <QuestionCard
                    question={questions[currentQuestionIndex].question}
                    options={questions[currentQuestionIndex].options}
                    correctAnswer={questions[currentQuestionIndex].correct_answer}
                    onAnswer={handleAnswer}
                />
            )}
            <p className="mt-4 text-lg font-semibold">Score: {score}</p>
        </div>
    );
}