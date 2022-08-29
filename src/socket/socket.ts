import { io } from 'socket.io-client'

import { backendLocation } from '../__env';

const configureSocket = () => {

  const socket = io(backendLocation);

  socket.on("Elpis", () => {

    console.log("Elpis is Kami");

  })

}

export default configureSocket
