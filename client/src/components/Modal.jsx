import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router"
import Swal from "sweetalert2";

export default function Modal({ isOpen, setIsOpen }) {

    const nav = useNavigate()
    const [selectedCategory, setSelectedCategory] = useState('')

    const categories = [
        "General Knowledge",
        "Science",
        "History",
        "Technology",
        "Entertainment"
    ]

    async function handleCreateRoom() {
        if (!selectedCategory) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please select a category!',
            });
            return;
        }

        try {
            const { data } = await axios({
                method: 'POST',
                url: 'https://gc01.destyan.tech/rooms',
                data: {
                    category: selectedCategory
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
    
            setIsOpen(false);
            
            nav('/rooms/' + data.id);
            
        } catch (error) {
            let message = 'Oops... Something went wrong!';
            if (error.response) {
                message = error.response.data.message;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: message,
            });
        }
        // navigate(`/quiz?category=${selectedCategory}`);
    }

    function handleCloseModal() {
        setIsOpen(false);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Open Modal Button */}
            {/* <button
                onClick={() => setIsOpen(true)}
                className="btn bg-cyan-500 hover:bg-purple-500 text-white font-bold"
            >
                Open Lobby
            </button> */}

            {/* MODAL */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-gray-900 p-6 rounded-lg shadow-lg border border-gray-700 w-96 text-center">
                        {/* CLOSE BUTTON */}
                        <Link
                            onClick={handleCloseModal}
                            className="btn btn-sm btn-circle absolute right-2 top-2 bg-red-500 text-white"
                        >
                            ✕
                        </Link>

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
                            // to='/playgame'
                            onClick={handleCreateRoom}
                            className="btn mt-4 bg-cyan-500 hover:bg-purple-500 text-white font-bold w-full"
                            
                        >
                            Create Room
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}