import { useRoom } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { rooms, setSelectedRoom } = useRoom(); // Gunakan state baru
  const navigate = useNavigate();

  const handleJoinRoom = (room) => {
    setSelectedRoom(room);  // Simpan room yang dipilih
    navigate("/lobby");     // Arahkan ke halaman lobby
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">List Rooms</h1>
      {rooms.length === 0 ? (
        <p className="text-gray-500">No rooms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div key={room.id} className="card bg-gray-100 p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-blue-600">{room.name}</h2>
              <p className="text-sm text-gray-600">Users: <span className="font-bold text-black">1</span></p>
              <p className="text-sm text-gray-600">Status: <span className="font-bold text-green-600">Waiting</span></p>
              <button 
                className="btn btn-sm btn-primary mt-2" 
                onClick={() => handleJoinRoom(room)}
              >
                Join Room
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
