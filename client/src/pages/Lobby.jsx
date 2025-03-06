import { useEffect, useState } from "react";
import socket from "../config/socket";
import { useNavigate, useParams } from "react-router";

export default function Lobby() {
  const nav = useNavigate();
  const params = useParams();
  const [roomPlayers, setRoomPlayers] = useState([]);

  // Hardcoded user list
  useEffect(() => {
    socket.emit("join-room", params.roomId);

    socket.on('roomPlayers', (roomPlayers) => {
      console.log(roomPlayers, "<<< roomPlayers");
      setRoomPlayers(roomPlayers);
    });

    return () => {
      socket.off("roomPlayers");
    };
  }, []);

  // const currentUser = "User1"; // Hardcoded user login

  return (
    <div style={{marginTop: 150}} className="container mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Lobby Room</h1>
      
      {/* {selectedRoom ? (
        <h2 style={{color: "white"}} className="text-lg text-gray-700 mb-2">
           Welcome to <span className="text-blue-600 font-bold">{selectedRoom.name}</span>! Room
        </h2>
      ) : (
        <p className="text-red-500 font-bold">No Room Selected</p>
      )} */}

      <h3 className="text-lg font-semibold mt-4">Users in Room:</h3>
      <div className="bg-white p-4 shadow-md rounded-lg w-1/2 mx-auto">
        <ul className="text-gray-600">
          {roomPlayers?.map((player) => (
            <li key={player.id} className="p-2">{player.User.username}</li>
          ))}

          {/* {roomPlayers.map((User) => (
            <li key={User.id} className="p-2">{User.username}</li>
          ))} */}
        </ul>
      </div>

      <button 
        className="btn btn-secondary mt-4" 
        onClick={() => nav("/start-game/"+params.roomId)}
      >
        Start Game
      </button>
    </div>
  );
}
