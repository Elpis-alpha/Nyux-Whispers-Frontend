import { io } from 'socket.io-client'

import { getToken } from '../controllers/APICtrl';

import { backendLocation } from '../__env';


export const socket = io(backendLocation, {

  auth: {

    token: getToken()

  }

});

console.log("connecting");

socket.on("connect", () => {

  console.log(socket);

})

socket.on("connected", () => {

  console.log("connected");

})

socket.on("disconnect", () => {

  console.log("disconnected");

})



const configureSocket = () => {

  socket.on("hello", (msg) => {

    // @ts-ignore
    console.log(socket?.data?.mat);

    console.log(msg);

  })

}

export default configureSocket
