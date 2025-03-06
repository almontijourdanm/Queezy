import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams, } from "react-router"
// import questionsData from '../helpers/Quizdata'
import QuestionCard from "../components/questioncard";
import RoomContext from "../context/RoomContext";
import socket from "../config/socket";
import { motion } from "framer-motion";



export default function Gamepage() {
    const nav = useNavigate();
    const params = useParams();

    // const { fetchRooms, rooms } = useContext(RoomContext);
    // const room = rooms.find(room => room.roomId === params.id);

    // console.log(room, 'room <<<<<<<<<');

    const { activeRoom: room, questions } = useContext(RoomContext);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [score, setScore] = useState(0)
    const [loading, setLoading] = useState(false)
    const [finsihed, setFinished] = useState(false);

    //timer
    const [timeLeft, setTimeLeft] = useState(5);
  

    const [players, setPlayers] = useState({
        questions: new Array(10).fill(""),
        answer: new Array(10).fill("")
    })

    function handleAnswer(selectedOption) {
        setLoading(true);
        if (selectedOption === questions[currentQuestionIndex].correct_answer) {
            setScore(score + 10)
        }

        const newQuestions = structuredClone(players.questions)
        newQuestions[currentQuestionIndex] = questions[currentQuestionIndex].question
        

        const newAnswers = structuredClone(players.answer)
        newAnswers[currentQuestionIndex] = selectedOption

        setPlayers({ questions: newQuestions, answer: newAnswers });

        setLoading(false);
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
    
        
        if (timeLeft <= 0) {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1)
            } else if (currentQuestionIndex === questions.length - 1) {
                setFinished(true)
            };

            setTimeLeft(5);
        }
        

        return () => clearInterval(timer);

    }, [timeLeft])

    useEffect(() => {
        // if (players.questions.length === questions.length && players.answer.length === questions.length) {
        if (finsihed) {
            console.log(players, "<<< players");

            socket.emit("finishGame", { roomId: params.roomId, players });

            nav('/scoreboard/'+params.roomId);
            
            // alert("Quiz Finished!")
            // nav('/lobby')
        }
    }, [players, finsihed])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen text-xl font-bold text-cyan-400">
                Loading Quiz...
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold text-cyan-400 mb-4">
                Room: {room.code} | Category: {room.category}
            </h1>
            <div className="mb-4 flex justify-center">
                <motion.h2
                className="text-2xl font-bold text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                >
                </motion.h2>

                {/* Timer Animation */}
                <motion.div
                className="flex justify-center items-center mt-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                >
                <span className="countdown font-mono text-4xl text-primary">
                    {timeLeft}
                </span>
                <span className="ml-2 text-lg text-gray-600">seconds left</span>
                </motion.div>
            </div>
            {questions?.length > 0 && (
                <QuestionCard
                    selected={players.answer[currentQuestionIndex]}
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