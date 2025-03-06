import { useState } from "react";
import { useNavigate } from "react-router";
import Modal from "./Modal";
// import { useRoom } from "../context/RoomContext";

function Navbar() {
  const nav = useNavigate();
  // const { rooms, setRooms } = useRoom();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [roomName, setRoomName] = useState("");

  function handleLogout() {
    localStorage.removeItem("access_token");
    nav("/login");
  }

  const handleCreateRoom = () => {
  //   if (roomName.trim() === "") return;
    
  //   const newRoom = { id: rooms.length + 1, name: roomName };
  //   setRooms([...rooms, newRoom]); // Update daftar rooms

  //   setRoomName("");
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="navbar bg-base-100 shadow-md px-4">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Queezy</a>
        </div>

        <div className="navbar-end flex gap-2">
          <button className="btn btn-primary" onClick={handleCreateRoom}>
            Create Room
          </button>

          <button className="btn btn-outline" onClick={handleLogout}>
            Logout
          </button>

          <a href="/faq" className="btn btn-ghost">FAQ</a>
        </div>
      </div>

      {/* Modal Pop-up */}
      {isModalOpen && <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
    </>
  );
}

export default Navbar;
