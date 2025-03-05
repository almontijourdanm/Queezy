import axios from "axios";
import { createContext, useEffect, useState } from "react";


const RoomContext = createContext({
  rooms: [],
  setRooms: () => {},
});

export default RoomContext;

export function RoomProvider({ children }) {
  const [rooms, setRooms] = useState([]);

  async function fetchRooms() {
    
    const { data } = await axios({
      method: "GET",
      url: "http://localhost:3000/rooms",
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
        fetchRooms
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}