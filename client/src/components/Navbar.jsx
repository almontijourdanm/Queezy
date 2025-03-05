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
      {isModalOpen && (
        <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        //   <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        //     <h2 className="text-xl font-bold mb-4 text-blue-600">Create Room</h2>
        //     <input
        //       type="text"
        //       placeholder="Enter Room Name"
        //       className="input input-bordered w-full mb-4"
        //       value={roomName}
        //       onChange={(e) => setRoomName(e.target.value)}
        //     />
        //     <div className="flex justify-end">
        //       <button className="btn btn-error mr-2" onClick={() => setIsModalOpen(false)}>
        //         Cancel
        //       </button>
        //       <button className="btn btn-success" onClick={handleCreateRoom}>
        //         Create
        //       </button>
        //     </div>
        //   </div>
        // </div>
      )}
    </>
  );
}

export default Navbar;
