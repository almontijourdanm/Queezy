import axios from "axios";
import { createContext, useEffect, useState } from "react";


const RoomContext = createContext({
  rooms: [],
  setRooms: () => {},
});

export default RoomContext;

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);

  const [activeRoom, setActiveRoom] = useState({});
  const [questions, setQuestions] = useState([])
  


  async function fetchRooms() {
    
    const { data } = await axios({
      method: "GET",
      url: "https://gc01.destyan.tech/rooms",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    

    setRooms(data);
  }

  return (
    <RoomContext.Provider 
      value={{ 
        rooms, 
        setRooms,
        fetchRooms,
        activeRoom,
        setActiveRoom,
        questions,
        setQuestions
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}