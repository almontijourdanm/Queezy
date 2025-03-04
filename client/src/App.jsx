import { useState } from 'react'
import Instructions from './pages/Instructions'

export default function App() {
  const [showInstructions, setShowInstructions] = useState(true);

  return (
    <>
      <div className="p-4">
        {showInstructions && <Instructions onClose={() => setShowInstructions(false)} />}
        <button className="btn btn-secondary" onClick={() => setShowInstructions(true)}>
          Show Instructions
        </button>
      </div>
    </>
  )
}
