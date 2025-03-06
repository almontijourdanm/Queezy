import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const QuizGame = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [question, setQuestion] = useState("What is the capital of France?");
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <motion.div
        className="card w-96 bg-base-100 shadow-xl p-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {!gameOver ? (
          <>
            <motion.h2
              className="text-2xl font-bold text-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {question}
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

            <div className="mt-6 flex justify-center">
              <motion.button
                className="btn btn-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTimeLeft(30)}
              >
                Reset Timer
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-red-500">Time's Up!</h2>
            <p className="text-gray-600 mt-2">Game Over</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default QuizGame;
