import { useState } from "react";
import { useNavigate, Link } from "react-router"

export default function Modal(isOpen, setIsOpen) {

    const navigate = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState('')
    const [roomCode, setRoomCode] = useState('')
    const [rooms, setRooms] = useState(['room1', 'room2', 'room3', 'room4', 'room5', 'room6', 'room7', 'room8', 'room9', 'room10'])
    // const [isOpen, setIsOpen] = useState(false)

    const categories = [
        "General Knowledge",
        "Science",
        "History",
        "Technology",
        "Entertainment"
    ]

    function handleStartQuiz() {
        if (!selectedCategory) {
            alert("Please select a category!");
            return;
        }

        setIsOpen(false)
        navigate(`/quiz?category=${selectedCategory}`);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Open Modal Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="btn bg-cyan-500 hover:bg-purple-500 text-white font-bold"
            >
                Open Lobby
            </button>

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 w-96 text-center">
                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-500 text-white"
                        >
                            ✕
                        </button>

                        <h1 className="text-2xl font-bold text-cyan-400 drop-shadow-lg mb-4">
                            Select Your Room & Category
                        </h1>

                        {/* CATEGORY SELECTION */}
                        <h2 className="text-lg font-semibold mb-2">Select a Category</h2>
                        <div className="grid gap-3">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`btn ${selectedCategory === category ? "btn-primary" : "btn-ghost"}`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                       
                        {/* START QUIZ BUTTON */}
                        <Link
                            to='/playgame'
                            onClick={handleStartQuiz}
                            className="btn mt-4 bg-cyan-500 hover:bg-purple-500 text-white font-bold w-full"
                            
                        >
                            Start Quiz
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}