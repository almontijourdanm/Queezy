import { useState } from "react";

export default function Instructions() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {isOpen && (
        <dialog open className="modal modal-open" aria-hidden={!isOpen} role="dialog">
          <div className="modal-box">
            <h1 className="text-2xl font-bold text-center mb-4">📖 How to Play</h1>

            <div className="space-y-4">
              <section>
                <h2 className="text-lg font-semibold">👥 Players</h2>
                <p>Up to <span className="font-bold">4 participants</span> can join the game.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">❓ Questions & Answers</h2>
                <p>The game consists of <span className="font-bold">10 questions</span>. Each question has <span className="font-bold">4 answer choices</span>.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">⏳ Time Limit</h2>
                <p>Players have <span className="font-bold">5 seconds</span> to answer each question.</p>
              </section>

              <section>
                <h2 className="text-lg font-semibold">⚡ Scoring System</h2>
                <ul className="list-disc pl-5">
                  <li>Wrong answers earn <span className="font-bold">no points</span>.</li>
                  <li>The player with the <span className="font-bold">highest score</span> at the end wins!</li>
                </ul>
              </section>
            </div>

            <div className="modal-action">
              <button className="btn btn-primary" onClick={() => setIsOpen(false)}>Got It!</button>
            </div>
          </div>

          {/* Click outside to close */}
          <form method="dialog" className="modal-backdrop" onClick={() => setIsOpen(false)}>
            <button>Close</button>
          </form>
        </dialog>
      )}
    </>
  );
}
