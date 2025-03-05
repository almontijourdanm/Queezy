import { useNavigate } from "react-router-dom";
import { useRoom } from "../context/RoomContext";

export default function Lobby() {
  const navigate = useNavigate();
  const { selectedRoom } = useRoom();

  // Hardcoded user list
  const users = ["User1", "User2", "User3"];
  const currentUser = "User1"; // Hardcoded user login

  return (
    <div style={{marginTop: 150}} className="container mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Lobby Room</h1>
      
      {selectedRoom ? (
        <h2 style={{color: "white"}} className="text-lg text-gray-700 mb-2">
           Welcome to <span className="text-blue-600 font-bold">{selectedRoom.name}</span>! Room
        </h2>
      ) : (
        <p className="text-red-500 font-bold">No Room Selected</p>
      )}

      <h3 className="text-lg font-semibold mt-4">Users in Room:</h3>
      <div className="bg-white p-4 shadow-md rounded-lg w-1/2 mx-auto">
        <ul className="text-gray-600">
          {users.map((user, index) => (
            <li key={index} className="p-2">{user}</li>
          ))}
        </ul>
      </div>

      <button 
        className="btn btn-secondary mt-4" 
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
}
