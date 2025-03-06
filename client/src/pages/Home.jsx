import { useContext, useEffect } from "react";
import RoomContext from "../context/RoomContext";
import socket from "../config/socket";
import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";

export default function Home() {
  const nav = useNavigate();
  const { fetchRooms, rooms } = useContext(RoomContext);
  console.log(rooms, 'rooms <<<<<<<<<');
  
  useEffect(() => {
    fetchRooms();
  }, []);

  const handleJoinRoom = (room) => {
    nav('/rooms/' + room.id);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold text-center mb-4">List Rooms</h1>
        {rooms.length === 0 ? (
          <p className="text-gray-500">No rooms created yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <div key={room.id} className="card bg-gray-100 p-4 rounded-lg shadow-md">
                <label className="text-2 text-center font-bold text-black">{room.code}</label>
                <h2 className="text-xl font-semibold text-blue-600">{room.name}</h2>
                <p className="text-sm text-gray-600">Host: <span className="font-bold text-black">{room.User.username}</span></p>
                <p className="text-sm text-gray-600">Status: <span className="font-bold text-green-600">{room.status}</span></p>
                <p className="text-sm text-gray-600">Category: <span className="font-bold text-green-600">{room.category}</span></p>
                
                {room.status === 'Waiting' && (
                  <button 
                    className="btn btn-sm btn-primary mt-2" 
                    onClick={() => handleJoinRoom(room)}
                  >
                    Join Room
                  </button>                  
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
