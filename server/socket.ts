import {Server, type ServerOptions} from 'socket.io'
import type {H3Event} from 'h3'
const options : Partial<ServerOptions> = {
    path:"https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=1000",
    serveClient:false
}

export const io = new Server(options);
export function initSocket ( event : H3Event) {
    io.attach(event.node.res.socket?.server)
    io.of('./chat').on('connection', (socket) => {
        socket.emit("connected",{ message: "Connection established"})
    })
}