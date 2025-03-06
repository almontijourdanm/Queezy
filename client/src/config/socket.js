import { io } from "socket.io-client";

const socket = io("https://gc01.destyan.tech", {
  auth: (cb) => {
    cb({ access_token: localStorage.getItem('access_token') })
  }
});
console.log(socket);

export default socket