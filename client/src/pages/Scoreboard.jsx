import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import socket from "../config/socket";
import { Link } from "react-router";

export default function Scoreboard() {

    const [scoreBoard, setScoreBoard] = useState([]);

    useEffect(() => {
        socket.on("scoreBoard", (scoreBoard) => {
            console.log(scoreBoard, "<<< scoreBoard");
            
            setScoreBoard(scoreBoard);
        })
    }, []);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-black via-gray-900 to-gray-800 p-6 text-white">
            <motion.h1 
                className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 drop-shadow-lg"
                initial={{ opacity: 0, y: -50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
            >
                🏆 Quiz Scoreboard 🏆
            </motion.h1>

            <motion.div 
                className="flex flex-col bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-2xl shadow-xl p-6 w-full max-w-lg border border-gray-700"
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 0.6 }}
            >
                <h2 className="text-2xl font-semibold text-center text-cyan-300 mb-4">Top Scorers</h2>

                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="text-gray-300">
                            <th className="p-3 border-b border-gray-700">#</th>
                            <th className="p-3 border-b border-gray-700">Player</th>
                            <th className="p-3 border-b border-gray-700 text-right">Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {players
                            .sort((a, b) => b.score - a.score)
                            .map((player, index) => ( */}
                                    {scoreBoard.map((player, index) => {
                                        return (
                                            <motion.tr 
                                                key={player.id} 
                                                className="border-b border-gray-700 hover:bg-gray-800 transition-all"
                                                whileHover={{ scale: 1.05, backgroundColor: "#1e293b" }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <td className="p-3 font-bold text-purple-400">{index + 1}</td>
                                                <td className="p-3 flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                                                        {player.User.username[0].toUpperCase()}
                                                    </div>
                                                        {player.User.username}
                                                </td>
                                                <td className="p-3 font-bold text-right text-green-400">{player.score}</td>
                                            </motion.tr>
                                        )
                                    })}
                            {/* ))} */}
                    </tbody>
                </table>

                <Link to={'/'} className="btn btn-error mt-5">Close</Link>
            </motion.div>
        </div>
    );
}